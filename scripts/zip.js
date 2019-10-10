const zip = require("bestzip");
const fs = require("fs");
const package = require("../package.json");

const outputDir = "./out";
const destination = `${outputDir}/${package.author.replace(" ", "")}.zip`;
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}
zip({
  source: [
    "package*.json",
    "Dockerfile-Api",
    "Dockerfile-Web",
    "docker-compose.yml",
    ".dockerignore",
    ".gitignore",
    "README.md",
    "scripts/",
    "**/package*.json",
    "**/.gitiginore",
    "**/README.md",
    "c4-model-container.png",
    "api/src",
    "api/.env",
    "api/server.js",
    "web/public",
    "web/src",
    "web/.env",
    "web/babel.config.js"
  ],
  destination: destination
})
  .then(function() {
    console.log("Compression completed.");
  })
  .catch(function(err) {
    console.error(err.stack);
    process.exit(1);
  });
