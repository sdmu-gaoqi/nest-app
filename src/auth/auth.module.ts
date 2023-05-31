import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
