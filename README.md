# Nest JWT 登录

附上 github 地址 https://github.com/GQ-OG/nest-app

使用内置@nestjs/passport 模块

在 nest 中使用 JWT 需要使用

```
npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local
npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt
```

```
 nest g mo auth
 nest g mo user
 nest g s auth --no-spec
 nest g s user --no-spec
 nest g controller auth --no-spec
```

user 负责撰写读取用户信息
auth 引入 user 模块 负责校验登录信息
在 auth 中进行守卫验证

```
import { AuthGuard } from '@nestjs/passport';

在controller登录方法中使用
UseGuards(AuthGuard('local'))
```

local.strategy.ts 进行守卫验证逻辑
默认名为前缀 local

在 auth.service 中进行 JWT 验证
login 方法使用 this.jwtService.sign(payload)返回 JWT token

jwt.strategy 撰写验证策略 通过 headers 中的 Token 与守卫进行 验证信息

使用了 swagger 撰写文档
useGlobalInterceptors 处理全局请求返回信息
useGlobalPipes 处理入参校验

##websocket 案例 使用 serve 工具打开 websocket-demo.html 查看
