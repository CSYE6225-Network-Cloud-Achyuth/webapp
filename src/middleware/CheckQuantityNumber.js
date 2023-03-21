import BadRequestException from "../errors/BadRequest.js";
import { logger } from "../winston-log/winston.js";

const checkQuantityNumber = (request, response, next) => {
  const { quantity } = request.body;

  if (quantity !== undefined || quantity !== null) {
    if (!Number.isInteger(quantity)) {
      logger.error("User didn't give the quantity as integer");
      throw new BadRequestException("Given Quantity is not an integer");
    }
  }

  next();
};

export { checkQuantityNumber };
