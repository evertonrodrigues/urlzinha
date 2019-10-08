const express = require("express");
const app = express();
const Config = require("./src/config");

require("./src/loaders")(app);

require("./src/routes")(app);

console.log("-----", Config.redis.url);

app.listen(Config.server.port, () => {
  console.log(`Server listening on port ${Config.server.port}`);
});
