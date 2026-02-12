import { Module } from '@nestjs/common';
import { ConnectController } from './connect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { students } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([students])

  ],
  controllers: [ConnectController]
})
export class ConnectModule {}
