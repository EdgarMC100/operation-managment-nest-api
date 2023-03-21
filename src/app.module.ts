import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { RolesController } from './controllers/roles/roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { User2Controller } from './users/users2.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config/configuration';
import { DatabaseConfig } from './config/database.config';
import { MyloggerProvider } from './providers/mylogger/mylogger.provider/mylogger.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
      // inject: [ConfigService],
      // useFactory: async (configService: ConfigService) => ({
      //   type: 'mysql',
      //   host: '127.0.0.1',
      //   port: parseInt(configService.get('DATABASE_PORT', '3306')),
      //   database: 'operation-management',
      //   username: 'root',
      //   password: 'root',
      //   entities: ['dist/**/*.entity{.ts,.js}'],
      //   synchronize: true,
      // }),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   port: Number(process.env.DB_PORT || 3306),
    //   host: process.env.DB_HOST || '127.0.0.1',
    //   database: process.env.DB_NAME || 'operation-management',
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   // inject: [ConfigService],
    //   // useClass: DatabaseConfig,

    //   // useFactory: async (configService: ConfigService) => ({
    //   //   type: 'mysql',
    //   //   host: configService.get('host', '127.0.0.1'),
    //   //   port: parseInt(configService.get('DATABASE_PORT', '3306')),
    //   //   username: configService.get<string>('username', 'rot'),
    //   //   password: configService.get('DATABASE_PASSWORD', 'root'),
    //   //   database: configService.get('DATABASE_NAME', 'operation-management'),
    //   //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   //   //
    //   //   synchronize: true,
    //   // }),
    // }),
    UsersModule,
  ],
  controllers: [
    AppController,
    UsersController,
    RolesController,
    User2Controller,
  ],
  providers: [AppService, UsersService, MyloggerProvider],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    console.log(configService.get('cors'));
  }
}
