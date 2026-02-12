import { Test, TestingModule } from '@nestjs/testing';
import { InsertController } from './insert.controller';

describe('InsertController', () => {
  let controller: InsertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InsertController],
    }).compile();

    controller = module.get<InsertController>(InsertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
