const productConfig = {
  mysql: {
    port: '数据库端口',
    host: '数据库地址',
    user: '用户名',
    password: '密码',
    database: 'nest_zero_to_one', // 库名
    connectionLimit: 10, // 连接限制
  },
  redis: {
    port: '线上 Redis 端口',
    host: '线上 Redis 域名',
    db: '库名',
    password: 'Redis 访问密码',
  },
};

const localConfig = {
  mysql: {
    port: 3306,
    host: '127.0.0.1',
    username: 'root',
    password: 'root',
    database: 'test', // 库名
    type: 'mysql',
    autoLoadEntities: true,
    synchronize: true,
  },
  redis: {
    port: 6379,
    host: '127.0.0.1',
    db: 0,
    password: 'root',
  },
};

// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
// const config = process.env.NODE_ENV ? productConfig : localConfig;
const config = localConfig;

export default config;
