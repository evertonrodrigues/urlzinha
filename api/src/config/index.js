
require('dotenv').config();

module.exports = {
    server: {
        port: process.env.SERVER_PORT || 3000,
    },
    redis: {
        url: process.env.REDIS_URL || ''
    }
}