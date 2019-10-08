const validUrl = require("valid-url");
const shortid = require("shortid");
const UnavailiableCustomUrlError = require("./UrlShortenException");
const RedisClient = require("./RedisClient");

class UrlShorten {
  constructor(urlRepository = new RedisClient()) {
    this.urlRepository = urlRepository;
  }

  async shorten(url) {
    if (!validUrl.isUri(url.original)) {
      throw new Error("Invalid Url.");
    }
    const shortenedUrl =
      url.customShortenedUrl != undefined && url.customShortenedUrl != null
        ? url.customShortenedUrl
        : shortid.generate();
    if (await this.findUrl(shortenedUrl) != null) {
      throw new UnavailiableCustomUrlError();
    }
    const urlModel = {
      original: url.original,
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
