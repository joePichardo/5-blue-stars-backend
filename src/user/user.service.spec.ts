require('dotenv').config();
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserService', () => {
  let userService: UserService;

  const mockRepository = {
    save: jest.fn().mockImplementation((dto: any) => Promise.resolve({ id: Date.now(), ...dto })),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
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
    const dto = { name: 'Test User Service', email: 'test.user.service@test.com', password: 'password1234' };
    const user = await userService.createUser(dto);

    expect(user).toHaveProperty('id');
    expect(user.name).toEqual(dto.name);
    expect(user.email).toEqual(dto.email);
    // For security, you should not return the password hash
    expect(user).not.toHaveProperty('password');
  });
});
