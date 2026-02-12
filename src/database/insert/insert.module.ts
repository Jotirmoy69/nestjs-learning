import { Module } from '@nestjs/common';
import { InsertService } from './insert.service';
import { InsertController } from './insert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './user.entity';

@Module({ 
  imports:[TypeOrmModule.forFeature([users])],
  controllers: [InsertController],
  providers: [InsertService],
})  
export class InsertModule {}
