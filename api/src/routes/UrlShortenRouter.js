const UrlShorten = require("../services/UrlShortenService");
const UnavailiableCustomUrlError = require("../services/UrlShortenException");

class UrlShortenRouter {
  constructor(app) {
    this.urlShorten = new UrlShorten();
    this.app = app;    
  }

  init() {
    this.app.post("/shorten", async (req, res) => {
      try {
        const url = await this.urlShorten.shorten(req.body);
        res.status(200).json(url);
      } catch (error) {
        if (error instanceof UnavailiableCustomUrlError) {
          res.status(422).send(error.message);
        } else {
          res.status(400).send(error.message);
        }
      }
    });

    this.app.get("/:url", async (req, res) => {
      try {
        const url = await this.urlShorten.findUrl(req.params.url);
        if (url) {
          res.redirect(301, url.original);          
        } else {
          res.status(404).send("No url found");
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
  }
}

module.exports = UrlShortenRouter;
