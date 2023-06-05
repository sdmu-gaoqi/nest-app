import { UnauthorizedException } from '@nestjs/common';
import { RedisInstance } from 'src/database/redis';

class RbacGuard {
  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 获取请求头里的 token
    const authorization = request['headers'].authorization || void 0;
    const token = authorization.split(' ')[1]; // authorization: Bearer xxx

    // 获取 redis 里缓存的 token
    const redis = await RedisInstance.initRedis('TokenGuard.canActivate', 0);
    const key = `${user.userId}-${user.username}`;
    const cache = await redis.get(key);

    if (token !== cache) {
      // 如果 token 不匹配，禁止访问
      throw new UnauthorizedException('您的账号在其他地方登录，请重新登录');
    }
    return true;
  }
}

export default RbacGuard;
