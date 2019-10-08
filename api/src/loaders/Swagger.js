const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

class Swagger {
  constructor(app) {
    this.swaggerDefinition = {
      info: {
        title: "Urlzinha Swagger API",
        version: "1.0.0",
        description: "Endpoints to test url shorten"
      },
      schemes: ["http"]
    };
    this.options = {
      swaggerDefinition: this.swaggerDefinition,
      apis: ["./src/routes/*.js"]
    };
    this.init(app);
  }

  init(app) {
    const swaggerSpec = swaggerJSDoc(this.options);

    app.get("/swagger.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
}
module.exports = Swagger;
