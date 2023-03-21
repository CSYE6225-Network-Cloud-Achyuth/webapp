import BadRequestException from "../errors/BadRequest.js";
import { logger } from "../winston-log/winston.js";

const checkIdValidationIntheUrl = async (req, res, next) => {
  const isNumeric = function (str) {
    if (typeof str != "string") return false; // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  };

  if (!isNumeric(req.params.userId)) {
    logger.error(
      "Please give the valid number of the user id in the url: " +
        req.params.userId
    );
    throw new BadRequestException(
      "Please give the valid number of the user id in the url"
    );
  }

  next();
};

export { checkIdValidationIntheUrl };
