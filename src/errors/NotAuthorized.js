import CustomError from "./CustomError.js";

class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor(message) {
    super(message);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}

export default NotAuthorizedError;
