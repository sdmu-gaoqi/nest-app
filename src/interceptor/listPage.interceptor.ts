import { Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ListPageInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const query = context.getArgByIndex(1).req.query;
    const page = query?.page || 1;
    const pageSize = query?.pageSize || 10;
    return next.handle().pipe(
      map((data) => {
        return {
          list: data[0],
          total: data[1],
          page: +page,
          pageSize: +pageSize,
        };
      }),
    );
  }
}
