import CustomError from "./CustomError.js";

class ForbiddenAccess extends CustomError {
  statusCode = 403;

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

export default ForbiddenAccess;
