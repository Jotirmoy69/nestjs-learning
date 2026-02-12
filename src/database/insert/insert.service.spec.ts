import { Test, TestingModule } from '@nestjs/testing';
import { InsertService } from './insert.service';

describe('InsertService', () => {
  let service: InsertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsertService],
    }).compile();

    service = module.get<InsertService>(InsertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
