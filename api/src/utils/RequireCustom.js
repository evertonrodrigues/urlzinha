const fs = require("fs");
const path = require("path");
const Config = require("../config");

module.exports = async (dirname, arg) => {
  dirname = path.join(Config.appDir, dirname);
  const files = fs.readdirSync(dirname);
  for (i = 0; i < files.length; i++) {
    const file = files[i];
    if (file !== "index.js") {
      const Dependency = require(path.join(dirname, file));
      const dependency = new Dependency(arg);
      if (dependency.init) {
        await dependency.init();
      }
    }
  }
};
