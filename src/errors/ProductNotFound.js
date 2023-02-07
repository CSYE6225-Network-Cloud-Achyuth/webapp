import CustomError from "./CustomError.js";

class ProductNotFound extends CustomError {
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

export default ProductNotFound;
