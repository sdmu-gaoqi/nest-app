import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/feature/user';
import { MyLogger } from 'src/utils/log4js';
import { FindOneOptions, Repository } from 'typeorm';

export type User = {
  id: number;
  username: string;
  password: string;
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findOneByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ username });
    return user;
  }

  async register(data) {
    // one
    // return this.userRepository.save(data);

    // two
    const user = this.userRepository.create(data);
    return this.userRepository
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values(user)
      .execute();
  }
}
