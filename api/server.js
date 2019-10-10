const express = require("express");
const app = express();
const Config = require("./src/config");
Config.appDir = __dirname;
const requireCustom = require("./src/utils/RequireCustom");

const run = async () => {
  await requireCustom("/src/loaders", app);
  await requireCustom("/src/routes", app);
  app.listen(Config.server.port, () => {
    console.log(`Server listening on port ${Config.server.port}`);
  });
};

run().catch(error => console.error(error));
