import CustomError from "./CustomError.js";

class UrlNotFoundError extends CustomError {
  statusCode = 404;

  constructor(message) {
    super(message);
  }

  serializeError() {
    return [
      {
        message: this.message,
      },
    ];
  }
}

export default UrlNotFoundError;
