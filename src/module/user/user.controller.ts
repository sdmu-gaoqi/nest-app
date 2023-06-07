import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterUserDto } from 'src/dto/register.dto';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private userServie: UserService) {}

  @Post('register')
  @ApiOperation({ summary: '注册' })
  @ApiBody({ type: RegisterUserDto })
  register(@Body() body: RegisterUserDto) {
    return this.userServie.register(body);
  }
}
