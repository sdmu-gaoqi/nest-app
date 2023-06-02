import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './config/interceptors/transform.interceptor';
import { WsAdapter } from './webscoket/ws.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useWebSocketAdapter(new WsAdapter(app));

  const options = new DocumentBuilder()
    .setTitle('nest-app Api')
    .setDescription('初次尝试搭建的nest仓库')
    .setVersion('1.0.0-alpha')
    .addTag('auth', '用户模块')
    .addTag('news', '信息模块')
    .addTag('uc', '账号中心')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
