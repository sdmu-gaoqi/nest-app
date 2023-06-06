import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/feature/user';
import { Repository } from 'typeorm';

export type User = {
  id: number;
  username: string;
  password: string;
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly goodRepository: Repository<Users>,
  ) {}
  private users: User[] = [
    { id: 1, username: '张三', password: 'abc123' },
    { id: 2, username: '李四', password: 'abc123' },
    { id: 3, username: '王五', password: 'abc123' },
    { id: 3, username: '赵六', password: 'abc123' },
  ];

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.users.find((item) => item.username === username);
  }
}
