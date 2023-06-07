import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: '张三', description: '用户名' })
  @IsNotEmpty({ message: '请输入用户名' })
  readonly username: string;
  @ApiProperty({ example: 'abc123', description: '密码' })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;
  @ApiProperty({ example: '', description: '邮箱' })
  readonly email: string;
}
