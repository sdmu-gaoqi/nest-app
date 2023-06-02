import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NewsModule } from './news/news.module';
import { UcModule } from './uc/uc.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [AuthModule, UserModule, NewsModule, UcModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
