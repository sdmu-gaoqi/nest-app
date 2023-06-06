import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { MyLogger } from 'src/utils/log4js';
import * as Moment from 'dayjs';
import { addHours, format } from 'date-fns';
import { Between, MoreThan } from 'typeorm';

export type listParams = {
  page: number;
  pageSize: number;
  orderBy?: string;
  orderValue: 'DESC' | 'ASC';
  time?: any;
};

export type PageResult = {
  /*  */
  pageParams: {
    skip: number;
    take: number;
  };
};

export const ListParamsDecorator = createParamDecorator(
  (data, req: ExecutionContext): PageResult => {
    const { query } = req.switchToHttp().getRequest();
    const {
      page = 1,
      pageSize = 10,
      orderBy = 'createTime',
      time,
      orderValue = 'DESC',
      ...other
    } = (query || {}) as listParams;
    const where = other || ({} as any);
    if (!isEmpty(time)) {
      // 传入时间范围
      if (Array.isArray(time)) {
        const startOfDay = new Date(+time[0]);
        const endOfDay = new Date(+time[1]);
        where.createTime = Between(startOfDay, endOfDay);
      }
      // 传入时间点 请求当天的数据
      else {
        const startOfDay = new Date(+time).setHours(0, 0, 0, 0);
        const endOfDay = new Date(+time).setHours(23, 59, 59, 999);
        where.createTime = Between(startOfDay, endOfDay);
      }
    }
    const pageParams = {
      skip: Number((page - 1) * pageSize),
      take: Number(pageSize),
      ...(!isEmpty(where) && {
        where: where,
      }),
      ...(orderBy &&
        orderValue && {
          order: {
            [orderBy]: orderValue,
          },
        }),
    };
    return { pageParams };
  },
);
