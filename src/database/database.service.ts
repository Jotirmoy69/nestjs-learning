import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private isConnected = false;

  onModuleInit() {
    this.isConnected = true;
    console.log('Database connected');
  }

  onApplicationShutdown(signal: string) {
    this.isConnected = false;
    console.log('Database disconnected. Signal: ', signal);
  }

  getIsConnected() {
    
    return this.isConnected ? 'Connected' : 'Disconnected';

  }
}
