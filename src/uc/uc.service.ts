import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class UcService {
  constructor(private Http: HttpService) {}
  getStatus() {
    return this.Http.get('https://api-test.papegames.com:12101/v1/ip/locate', {
      params: {
        clientid: 1083,
        timestamp: 1685675259,
        sig: '4ef37148e63d1e860bdcc089202c6383',
      },
    }).pipe(map((response) => response.data));
  }
}
