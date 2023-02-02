import CustomError from "./CustomError.js";

class BadRequestException extends CustomError {
  statusCode = 400;

  constructor(message) {
    super(message);

    // Object.setPrototypeOf(this, BadRequestException.prototype);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}

export default BadRequestException;
