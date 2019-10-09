
require('dotenv').config();

module.exports = {
    server: {
        port: process.env.SERVER_PORT || 3000,
    },
    redis: {
        url: process.env.REDIS_URL || 'redis-18497.c85.us-east-1-2.ec2.cloud.redislabs.com:18497',
        password: process.env.REDIS_PASSWORD || 'R!123qwedis!'
    }
}