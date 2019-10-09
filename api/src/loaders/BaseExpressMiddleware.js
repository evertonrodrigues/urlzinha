const bodyParser = require("body-parser");
const cors = require('cors');
const logger = require('morgan');

class BaseExpressMiddleware {
  constructor(app) {
    app.use(bodyParser.json());
    app.use(cors());
    app.use(logger('dev'));
  }
}
module.exports = BaseExpressMiddleware;
