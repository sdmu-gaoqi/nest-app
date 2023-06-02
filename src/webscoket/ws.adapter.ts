import * as WebSocket from 'ws';
import { WebSocketAdapter, INestApplicationContext } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { mergeMap, filter, map } from 'rxjs/operators';
import { json } from 'stream/consumers';

export class WsAdapter implements WebSocketAdapter {
  constructor(private app: INestApplicationContext) {}

  create(port: number, options: any = {}): any {
    console.log('ws create');
    return new WebSocket.Server({ port, ...options });
  }

  bindClientConnect(server, callback: any) {
    console.log('ws bindClientConnect, server:\n', server);
    server.on('connection', callback);
  }

  bindMessageHandlers(
    client: WebSocket,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ) {
    console.log('[waAdapter]有新的连接进来');
    fromEvent(client, 'message')
      .pipe(
        mergeMap((data) =>
          this.bindMessageHandler(client, data, handlers, process),
        ),
        filter((result) => result),
      )
      .subscribe((response) => client.send(JSON.stringify(response)));
  }

  bindMessageHandler(
    client: WebSocket,
    buffer,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ): Observable<any> {
    let message = null;
    try {
      message = JSON.parse(buffer.data);
      const { whisper } = message;
      if (whisper === '你真帅') {
        const data = {
          code: 0,
          msg: '这是实话，继续，我爱听',
        };
        client.send(JSON.stringify(data));
        return EMPTY;
      } else if (whisper) {
        const data = {
          code: 100001,
          msg: '抱歉，我没听懂，你可以说一点我听得懂的，比如 你真帅',
        };
        client.send(JSON.stringify(data));
        return EMPTY;
      }
    } catch (error) {
      console.log('ws解析json出错', error);
      return EMPTY;
    }

    const messageHandler = handlers.find(
      (handler) => handler.message === message.event,
    );
    if (!messageHandler) {
      return EMPTY;
    }
    return process(messageHandler.callback(message.data));
  }

  close(server) {
    console.log('ws server close');
    server.close();
  }
}
