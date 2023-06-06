import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/module/auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/feature/news';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
    // 自动在库中创建表
    TypeOrmModule.forFeature([News]),
  ],
  providers: [NewsService, JwtStrategy],
  controllers: [NewsController],
})
export class NewsModule {}
