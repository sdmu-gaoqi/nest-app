import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { NewsModule } from './module/news/news.module';
import { HttpModule } from '@nestjs/axios';
import { WebStartGatWay } from './webscoket/ws.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/db';
import { AuroraMysqlConnectionOptions } from 'typeorm/driver/aurora-mysql/AuroraMysqlConnectionOptions';
import { CommonModule } from './module/common/common.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    NewsModule,
    CommonModule,
    HttpModule,
    TypeOrmModule.forRoot(
      config.mysql as unknown as Partial<AuroraMysqlConnectionOptions>,
    ),
  ],
  controllers: [AppController],
  providers: [AppService, WebStartGatWay],
})
export class AppModule {}
