const redis = require("redis");
const { promisify } = require("util");
const Config = require("../config");

class RedisClient {
  constructor(redisConfig = Config.redis) {
    this.client = redis.createClient(redisConfig.url);
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
  }
  getAsync() {}
  setAsync() {}
}

module.exports = RedisClient;
