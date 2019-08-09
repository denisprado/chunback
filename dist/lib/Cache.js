"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _ioredis = require('ioredis'); var _ioredis2 = _interopRequireDefault(_ioredis);
var _redis = require('../config/redis'); var _redis2 = _interopRequireDefault(_redis);

class Cache {
  constructor() {
    this.redis = new (0, _ioredis2.default)(process.env.REDIS_URL, {
      keyPrefix: 'cache:',
    });
  }

  set(key, value) {
    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
  }

  async get(key) {
    const cached = await this.redis.get(key);

    return cached ? JSON.parse(cached) : null;
  }

  invalidate(key) {
    return this.redis.del(key);
  }
}

exports. default = new Cache();
