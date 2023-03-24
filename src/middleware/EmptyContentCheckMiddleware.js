import BadRequestException from "../errors/BadRequest.js";
import { logger } from "../winston-log/winston.js";

const emptyContentCheckMiddleware = async (req, res, next) => {
  if (
    req.body && // 👈 null and undefined check
    Object.keys(req.body).length === 0 &&
    Object.getPrototypeOf(req.body) === Object.prototype
  ) {
    logger.error("User given an empty payload");
    throw new BadRequestException("Empty Payload!");
  }

  next();
};

export { emptyContentCheckMiddleware };
