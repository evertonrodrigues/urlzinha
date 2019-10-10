const Config = require("../config");
const mongoose = require('mongoose');

class Mongo {
    constructor() {
        mongoose.connect(Config.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.Promise = global.Promise;
    }
}

module.exports = Mongo;