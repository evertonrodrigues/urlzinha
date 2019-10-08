const bodyParser = require("body-parser");

class Middleware {
  constructor(app) {
    app.use(bodyParser.json());
  }
}
module.exports = Middleware;
