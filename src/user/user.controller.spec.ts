require('dotenv').config();
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";

describe('UserController', () => {
  let userController: UserController;

  const mockUserService = {
    createUser: jest.fn().mockImplementation((dto: any) => {
      const { password, ...userWithoutPassword } = dto;
      return Promise.resolve({ id: Date.now(), ...userWithoutPassword });
    }),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.TEST_DATABASE_HOST,
          port: Number(process.env.TEST_DATABASE_PORT),
          username: process.env.TEST_DATABASE_USERNAME,
          password: process.env.TEST_DATABASE_PASSWORD,
          database: process.env.TEST_DATABASE_NAME,
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: Boolean(process.env.TEST_DATABASE_SYNC),
        })
      ],
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
    const dto = { name: 'Test', email: 'test@example.com', password: '1234password' };
    const user = await userController.createUser(dto);

    expect(user).toHaveProperty('id');
    expect(user.name).toEqual(dto.name);
    expect(user.email).toEqual(dto.email);
    // For security, you should not return the password hash
    expect(user).not.toHaveProperty('password');
  });
});
