const UrlShorten = require("../services/UrlShorten");
const urlShorten = new UrlShorten();
const UnavailiableCustomUrlError = require("../services/UrlShortenException");

module.exports = app => {
  /**
   * @swagger
   * /shorten:
   *   post:
   *     tags:
   *       - Url
   *     name: Shorten url
   *     summary: Shorten url
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *            original:
   *                type: string
   *            customShortenedUrl:
   *                type: string
   *         required:
   *           - original
   *     responses:
   *        200:
   *           description: "Successful operation"
   *        422:
   *           description: "This custom URL is not available"
   */
  app.post("/shorten", async (req, res) => {
    try {
      const url = await urlShorten.shorten(req.body);
      res.status(200).json(url);
    } catch (error) {
      if (error instanceof UnavailiableCustomUrlError) {
        res.status(422).send(error.message);
      } else {
        res.status(error.status).send(error.msg);
      }
    }
  });

  /**
   * @swagger
   * /{url}:
   *   get:
   *     tags:
   *       - Url
   *     name: Redirect to original shortened url
   *     summary: Redirect to original shortened url
   *     parameters:
   *       - name: url
   *         in: path
   *         description: "Url id for original"
   *         required: true
   *         type: string
   *     responses:
   *        302:
   *            description: "Redirection reponse"
   *        404:
   *            description: "No url found"
   *        500:
   *            description: "Internal server error"
   */
  app.get("/:url", async (req, res) => {
    try {
      const url = await urlShorten.findUrl(req.params.url);
      if (url) {
        res.redirect(url.original);
      } else {
        res.status(404).send("No url found");
      }
    } catch (error) {
      res.status(500).send(error.msg);
    }
  });
};

// class UrlShortenRouter {
//   constructor(app) {
//     this.urlShorten = new UrlShorten();
//     this.init(app);
//   }

//   init(app) {
//     /**
//      * @swagger
//      * /shorten:
//      *   post:
//      *     tags:
//      *       - Url
//      *     name: Shorten url
//      *     summary: Shorten url
//      *     consumes:
//      *       - application/json
//      *     produces:
//      *       - application/json
//      *     parameters:
//      *       - name: body
//      *         in: body
//      *         schema:
//      *           type: object
//      *           properties:
//      *            original:
//      *                type: string
//      *            customShortenedUrl:
//      *                type: string
//      *         required:
//      *           - original
//      *     responses:
//      *        200:
//      *           description: "Successful operation"
//      *        422:
//      *           description: "This custom URL is not available"
//      */
//     app.post("/shorten", async (req, res) => {
//       try {
//         const url = await this.urlShorten.shorten(req.body);
//         res.status(200).json(url);
//       } catch (error) {
//         if (error instanceof UnavailiableCustomUrlError) {
//           res.status(422).send(error.message);
//         } else {
//           res.status(error.status).send(error.msg);
//         }
//       }
//     });

//     /**
//      * @swagger
//      * /{url}:
//      *   get:
//      *     tags:
//      *       - Url
//      *     name: Redirect to original shortened url
//      *     summary: Redirect to original shortened url
//      *     parameters:
//      *       - name: url
//      *         in: path
//      *         description: "Url id for original"
//      *         required: true
//      *         type: string
//      *     responses:
//      *        302:
//      *            description: "Redirection reponse"
//      *        404:
//      *            description: "No url found"
//      *        500:
//      *            description: "Internal server error"
//      */
//     app.get("/:url", async (req, res) => {
//       try {
//         const url = await this.urlShorten.findUrl(req.params.url);
//         if (url) {
//           res.redirect(url.original);
//         } else {
//           res.status(404).send('No url found');
//         }
//       } catch (error) {
//         res.status(500).send(error.msg);
//       }
//     });
//   }
// }

// module.exports = UrlShortenRouter;
