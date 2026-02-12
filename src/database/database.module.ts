import { Module } from '@nestjs/common';
import { ConnectModule } from './connect/connect.module';
import { InsertModule } from './insert/insert.module';

@Module({
  imports: [ConnectModule, InsertModule]
})
export class DatabaseModule {}
