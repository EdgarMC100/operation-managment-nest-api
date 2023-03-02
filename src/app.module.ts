import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { RolesController } from './controllers/roles/roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users/users.service';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './model/user.entity';
import { User2Controller } from './users/users2.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'operation-management',
      entities: ['dist/**/*.entity{.ts,.js}'],
      //
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [
    AppController,
    UsersController,
    RolesController,
    User2Controller,
  ],
  providers: [AppService, UsersService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
