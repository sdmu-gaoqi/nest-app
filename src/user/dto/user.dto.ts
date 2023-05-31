import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: '请输入用户名' })
  readonly username: string;
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;
}
