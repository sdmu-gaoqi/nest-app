import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(username: string, passord: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password === passord) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
