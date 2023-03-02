import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller({
  path: 'users',
  version: '2',
})
export class User2Controller {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll(): string {
    return 'consider sub';
  }
}
