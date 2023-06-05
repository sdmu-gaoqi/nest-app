import { Request, Response } from 'express';
import { MyLogger } from 'src/utils/log4js';

export function logger(req: Request, res: Response, next: () => any) {
  const code = res.statusCode; //响应状态码
  next();
  // 组装日志信息
  const logFormat = `
  请求====================================
  Request original url: ${req.originalUrl}
  Method: ${req.method}
  Status code: ${code}
  Parmas: ${JSON.stringify(req.params)}
  Query: ${JSON.stringify(req.query)}
  Body: ${JSON.stringify(req.body)} \n  
  ========================================
`;
  //根据状态码，进行日志类型区分
  if (code >= 500) {
    MyLogger.error(logFormat);
  } else if (code >= 400) {
    MyLogger.warn(logFormat);
  } else {
    MyLogger.log(logFormat);
  }
}
