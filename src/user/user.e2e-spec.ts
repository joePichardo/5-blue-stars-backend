import {DeleteUserDto} from "./dto/delete-user.dto";

require('dotenv').config();
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { UserService } from "./user.service";

describe('Users', () => {
  let app: INestApplication;
  let userService: UserService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    userService = moduleFixture.get(UserService);
    await app.init();
  });

  it('POST /user - success', () => {
    return request(app.getHttpServer())
        .post('/user')
        .send({
          name: 'test',
          email: 'test@example.com',
          password: 'password1234',
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.email).toBe('test@example.com');
        });
  });

  afterAll(async () => {
    await userService.deleteUser({ email: "test@example.com" }); // Using your deletion method
    await app.close();
  });
});
