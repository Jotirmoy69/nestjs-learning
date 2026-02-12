import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { EmployeeModule } from './employee/employee.module';
import { StudentModule } from './student/student.module';
import { CustomerModule } from './customer/customer.module';
import { MynameController } from './myname/myname.controller';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionController } from './exception/exception.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { EvService } from './ev/ev.service';
import { EvController } from './ev/ev.controller'; 
import { students } from './database/connect/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [EmployeeModule, StudentModule, CustomerModule, DatabaseModule, ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URI,
    entities: [students],
    autoLoadEntities: true,
    synchronize: true
  })
  ],
  controllers: [
    AppController,
    ProductController,
    MynameController,
    UserRolesController,
    ExceptionController,
    DatabaseController,
    EvController,
  ],
  providers: [AppService, ProductService, DatabaseService, EvService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
