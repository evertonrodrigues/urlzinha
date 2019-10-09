const { promisify } = require("util");
const Config = require("../config");

class RedisClient {
  constructor(client = Config.redis.client) {
    this.client = client;
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
  }
  getAsync() {}
  setAsync() {}
}

module.exports = RedisClient;
