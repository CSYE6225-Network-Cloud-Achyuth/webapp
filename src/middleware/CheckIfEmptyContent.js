import BadRequestException from "../errors/BadRequest.js";
import { logger } from "../winston-log/winston.js";

const emptyContent = async (req, res, next) => {
  const { first_name, last_name, username, password } = req.body;

  if (
    first_name === undefined ||
    last_name === undefined ||
    username === undefined ||
    password === undefined
  ) {
    logger.error("Missing Content Payload or incorrect json keys");

    throw new BadRequestException(
      "Missing Content Payload or incorrect json keys"
    );
  } else {
    next();
  }
};

export { emptyContent };
