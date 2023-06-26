import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { INestApplication } from '@nestjs/common';

describe('Users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('POST /user - success', async () => {
    await request(app.getHttpServer())
        .post('/user')
        .send({
          name: 'test',
          email: 'test@example.com',
          password: 'password',
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.user.email).toBe('test@example.com');
        });
  });

  afterAll(async () => {
    await app.close();
  });
});
