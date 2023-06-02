import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(3002)
export class WebStartGatWay {
  @SubscribeMessage('hello')
  hello(@MessageBody() data: any) {
    return {
      event: 'hello',
      data: data,
      msg: 'success',
    };
  }
}
