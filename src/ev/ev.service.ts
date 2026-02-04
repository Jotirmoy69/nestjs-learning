import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EvService {
  constructor(private configService: ConfigService) {}
  getDBUri() {
    return this.configService.get<string>('MONGODB_URI');
  }
}
