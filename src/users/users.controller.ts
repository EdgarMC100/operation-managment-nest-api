import {
  Controller,
  Res,
  HttpStatus,
  Get,
  Version,
  Body,
  Post,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/model/user.entity';
import { UsersService } from './users.service';
// @Controller('/api/v1/users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async findAll(@Res() res: Response) {
    const users = await this.usersService.findAll();
    console.log(users);
    return res.status(HttpStatus.OK).json(users);
  }

  @Post('/signup')
  async signUp(@Res() response, @Body() user: User) {
    console.log(user);
    const newUser = await this.usersService.signup(user);
    return response.status(HttpStatus.CREATED).json({
      newUser,
    });
  }
}
