import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class CommonService {
  constructor(private Http: HttpService) {}
  getLocate() {
    return this.Http.get('https://url', {
      params: {
        clientid: 1083,
        timestamp: 1685675259,
        sig: '4ef37148e63d1e860bdcc089202c6383',
      },
    }).pipe(map((response) => response.data));
  }

  getprofile() {
    return this.Http.post(
      'https://url',
      {
        nid: 2498870,
        token: '7f0ddbc7b9300965798dea495123828f1ded1895',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    ).pipe(map((response) => response.data));
  }
}
