
require('dotenv').config();

module.exports = {
    server: {
        port: process.env.SERVER_PORT || 3000,
    },  
    mongo: {
        url : process.env.MONGO_URL || 'mongodb://admin:urlzinha123@ds333238.mlab.com:33238/urlzinha',        
    }
}