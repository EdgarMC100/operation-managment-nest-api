import {
  Controller,
  Res,
  HttpStatus,
  Get,
  Version,
  Body,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { User } from 'src/model/user.entity';
import { UsersService } from './users.service';
// @Controller('/api/v1/users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}
  @Get()
  async findAll(@Res() res: Response) {
    const users = await this.usersService.findAll();
    return res.status(HttpStatus.OK).json(users);
  }

  @Post('/signup')
  async signUp(@Res() response, @Body() user: User) {
    const newUser = await this.usersService.signup(user);
    return response.status(HttpStatus.CREATED).json({
      newUser,
    });
  }
}
