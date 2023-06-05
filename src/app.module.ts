import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { NewsModule } from './module/news/news.module';
import { UcModule } from './module/uc/uc.module';
import { HttpModule } from '@nestjs/axios';
import { WebStartGatWay } from './webscoket/ws.gateway';

@Module({
  imports: [AuthModule, UserModule, NewsModule, UcModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, WebStartGatWay],
})
export class AppModule {}
