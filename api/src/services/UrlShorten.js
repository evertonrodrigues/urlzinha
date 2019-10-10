const shortid = require("shortid");
const UnavailiableCustomUrlError = require("./UrlShortenException");
const UrlModel = require('../models/Url');

class UrlShorten {

  _isUrlValid(url) {
    if (!url) return false;
    const result = url.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return result == null ? false : true;
  }

  _getFormatedUrl({ original, shortened }) {
    return {
      original: original.startsWith("www")
        ? `http://${original}` : original,
      shortened: shortened
    }
  }

  async shorten(url) {
    if (!this._isUrlValid(url.original)) {
      throw new Error("Invalid Url.");
    }
    let urlDto = { original: url.original, shortened: url.customShortenedUrl }
    if (url.customShortenedUrl) {
      let urlModel = await UrlModel.findOne({ shortened: urlDto.shortened });
      if (!urlModel) {
        await UrlModel.create(urlDto);
      } else {
        if (urlModel.original != url.original) {
          throw new UnavailiableCustomUrlError();
        }
      }
    } else {
      let urlModel = await UrlModel.findOne({ original: urlDto.original });
      if (!urlModel) {
        urlDto.shortened = shortid.generate();
        await UrlModel.create(urlDto);
      } else {
        urlDto = urlModel;
      }
    }
    return this._getFormatedUrl(urlDto);
  }

  async findUrl(shortenedUrl) {
    let urlModel = await UrlModel.findOne({ shortened: shortenedUrl });
    return urlModel ? this._getFormatedUrl(urlModel) : null;
  }
}

module.exports = UrlShorten;