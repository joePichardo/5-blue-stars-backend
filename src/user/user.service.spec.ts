import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserService', () => {
  let userService: UserService;

  const mockRepository = {
    save: jest.fn().mockImplementation((dto: any) => Promise.resolve({ id: Date.now(), ...dto })),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = { name: 'Test', email: 'test@test.com', password: 'test' };
    const user = await userService.createUser(dto);

    expect(user).toHaveProperty('id');
    expect(user.name).toEqual(dto.name);
    expect(user.email).toEqual(dto.email);
    // For security, you should not return the password hash
    expect(user).not.toHaveProperty('password');
  });
});
