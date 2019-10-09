const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

class Swagger {
  constructor(app) {
    const swaggerDocument = YAML.load("./src/config/swagger.yaml");
    const path = "/api-docs";
    app.use(path, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log(`Swagger api on path ${path}`);
  }
}
module.exports = Swagger;
