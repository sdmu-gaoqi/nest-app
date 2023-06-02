import * as WebSocket from 'ws';
import {
  ConnectedSocket,
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
      msg: 'hello',
    };
  }
  @SubscribeMessage('你真帅')
  handsome(
    @MessageBody() data: any,
    @ConnectedSocket() client: WebSocket,
  ): any {
    console.log('收到消息 client:', client);
    client.send(
      JSON.stringify({
        event: 'tmp',
        data: '这里是个临时信息',
        msg: '你是个诚实的人',
      }),
    );
    return { event: 'hello2', data: data, msg: '希望你可以更诚实一点' };
  }
  @SubscribeMessage('你最帅了')
  TheMostHandsome(
    @MessageBody() data: any,
    @ConnectedSocket() client: WebSocket,
  ): any {
    return {
      event: 'hello2',
      data: data,
      msg: '是的、这是毫无疑问的、你有资格获得我的爱',
    };
  }
}
