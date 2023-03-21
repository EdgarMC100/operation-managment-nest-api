import { Test, TestingModule } from '@nestjs/testing';
import { MyloggerProvider } from './mylogger.provider';

describe('MyloggerProvider', () => {
  let provider: MyloggerProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyloggerProvider],
    }).compile();

    provider = module.get<MyloggerProvider>(MyloggerProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
