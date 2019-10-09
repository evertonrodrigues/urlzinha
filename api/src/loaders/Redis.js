const Config = require("../config");
const redis = require("redis");
const { promisify } = require("util");

class Redis {
  constructor() {
    this.client = redis.createClient(Config.redis.url);
    if (Config.redis.password) {
      this.client.auth(Config.redis.password);
    }
    Config.redis.client = this.client;
  }
}

module.exports = Redis;
