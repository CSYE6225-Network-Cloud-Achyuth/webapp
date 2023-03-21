import BadRequestException from "../errors/BadRequest.js";
import { logger } from "../winston-log/winston.js";

const checkPayloadLengthCheckUserPost = async (req, res, next) => {
  if (Object.keys(req.body).length > 4) {
    logger.error("User has provided additional fields!");

    throw new BadRequestException("You have given additional fields!");
  }

  next();
};

export { checkPayloadLengthCheckUserPost };
