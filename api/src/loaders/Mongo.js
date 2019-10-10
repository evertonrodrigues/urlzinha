const Config = require("../config");
const mongoose = require("mongoose");

class Mongo {
  async init() {
    mongoose.Promise = global.Promise;
    await mongoose.connect(Config.mongo.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const urlParameters = Config.mongo.url.split("@");
    console.log(
      "Connected with mongo:",
      urlParameters.length == 1 ? Config.mongo.url : urlParameters[1]
    );
  }
}

module.exports = Mongo;
