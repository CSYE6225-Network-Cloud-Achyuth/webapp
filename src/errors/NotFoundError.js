import CustomError from "./CustomError.js";

class NotFoundError extends CustomError {
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

export default NotFoundError;
