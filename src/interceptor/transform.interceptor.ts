import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MyLogger } from 'src/utils/log4js';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const req = context.getArgByIndex(1).req;
        const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        Request original url: ${req.originalUrl}
        Method: ${req.method}
        IP: ${req.ip}
        User: ${JSON.stringify(req.user)}
        Response data:\n ${JSON.stringify(req.data)}
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
        MyLogger.access(logFormat);
        return {
          data,
          statusCode: 'code' in data ? data.code : 0,
          success: !data.code,
          message: data?.message || 'success',
        };
      }),
    );
  }
}
