import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../model/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async signup(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    const reqBody = {
      name: user.name,
      mail: user.mail,
      password: hash,
    };

    const userFound = await this.usersRepository.findOneBy({
      mail: user.mail,
    });
    if (userFound) {
      const errors = { data: 'Name and email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.usersRepository.save(reqBody);

    // const foundUser = await this.usersRepository.findOneBy({ mail: user.mail });
  }
}
