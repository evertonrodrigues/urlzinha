class UnavailiableCustomUrlError extends Error {
  constructor(message = "This custom URL is not available.") {
    super(message);
  }
}
module.exports = UnavailiableCustomUrlError;
