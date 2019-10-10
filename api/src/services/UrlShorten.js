const shortid = require("shortid");
const UnavailiableCustomUrlError = require("./UrlShortenException");
const RedisClient = require("./RedisClient");

class UrlShorten {
  constructor(urlRepository = new RedisClient()) {
    this.urlRepository = urlRepository;
  }

  isUrlValid(url) {
    const result = url.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return result == null ? false : true;
  }

  async shorten(url) {
    // if (!validUrl.isUri(url.original)) {
    if (!this.isUrlValid(url.original)) {
      throw new Error("Invalid Url.");
    }
    const shortenedUrl =
      url.customShortenedUrl != undefined && url.customShortenedUrl != null
        ? url.customShortenedUrl
        : shortid.generate();
    if ((await this.findUrl(shortenedUrl)) != null) {
      throw new UnavailiableCustomUrlError();
    }
    const urlModel = {
      original: url.original.startsWith("www")
        ? `http://${url.original}`
        : url.original,
      shortened: shortenedUrl
    };
    await this.urlRepository.setAsync(
      urlModel.shortened,
      JSON.stringify(urlModel)
    );
    return urlModel;
  }

  async findUrl(shortenedUrl) {
    const value = await this.urlRepository.getAsync(shortenedUrl);
    return value ? JSON.parse(value) : null;
  }
}
module.exports = UrlShorten;
