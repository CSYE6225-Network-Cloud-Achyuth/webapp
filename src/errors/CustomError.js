class CustomError extends Error {
  statusCode;

  constructor(message) {
    super(message);
    // Object.setPrototypeOf(this, CustomError.prototype);
  }

  serializeError() {}
}

export default CustomError;
