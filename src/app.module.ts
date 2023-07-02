import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from "./user/user.module";
require('dotenv').config();

let rootObject: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: Boolean(process.env.DATABASE_SYNC),
};

if (process.env.NODE_ENV === "test") {
  rootObject = {
    type: 'postgres',
    host: process.env.TEST_DATABASE_HOST,
    port: Number(process.env.TEST_DATABASE_PORT),
    username: process.env.TEST_DATABASE_USERNAME,
    password: process.env.TEST_DATABASE_PASSWORD,
    database: process.env.TEST_DATABASE_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: Boolean(process.env.TEST_DATABASE_SYNC),
    autoLoadEntities: true
  };
}

@Module({
  imports: [
    TypeOrmModule.forRoot(rootObject),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
