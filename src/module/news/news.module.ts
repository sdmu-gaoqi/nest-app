import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/module/auth/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  providers: [NewsService, JwtStrategy],
  controllers: [NewsController],
})
export class NewsModule {}
