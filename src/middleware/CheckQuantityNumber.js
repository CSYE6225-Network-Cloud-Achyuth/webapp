import BadRequestException from "../errors/BadRequest.js";

const checkQuantityNumber = (request, response, next) => {
  const { quantity } = request.body;

  if (quantity !== undefined || quantity !== null) {
    if (!Number.isInteger(quantity)) {
      throw new BadRequestException("Given Quantity is not an integer");
    }
  }

  next();
};

export { checkQuantityNumber };
