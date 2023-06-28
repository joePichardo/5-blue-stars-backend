import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;

  const mockUserService = {
    createUser: jest.fn().mockImplementation((dto: any) => Promise.resolve({ id: Date.now(), ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    userController = module.get(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = { name: 'Test', email: 'test@test.com', password: 'test' };
    const user = await userController.createUser(dto);

    expect(user).toHaveProperty('id');
    expect(user.name).toEqual(dto.name);
    expect(user.email).toEqual(dto.email);
    // For security, you should not return the password hash
    expect(user).not.toHaveProperty('password');
  });
});
