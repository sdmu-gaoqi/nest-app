import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserDto } from 'src/user/dto/user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: '用户登录', description: '登录获取token' })
  @ApiBody({
    type: UserDto,
    description: '使用用户名+密码登录',
  })
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req, @Body() UserDto: UserDto) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: '获取登录信息' })
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
