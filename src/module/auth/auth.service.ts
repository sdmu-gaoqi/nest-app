import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RedisInstance } from 'src/database/redis';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    // throw new HttpException('错误', 500);
    // throw new Error('错误');
    const token = this.jwtService.sign(payload);
    const redis = await RedisInstance.initRedis('auth.certificate', 0);
    // 将用户信息和 token 存入 redis，并设置失效时间，语法：[key, seconds, value]
    await redis.setex(`${user.id}-${user.username}`, 300, `${token}`);
    return {
      access_token: token,
      username: user.username,
    };
  }
}
