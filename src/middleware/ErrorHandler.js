import CustomError from "../errors/CustomError.js";
import { logger } from "../winston-log/winston.js";

const errorHandler = async (err, req, res, next) => {
  console.log("Inside Error Handler");

  if (err instanceof CustomError) {
    logger.error(
      "Error Status: " +
        err.statusCode +
        " Serialized Error: " +
        err.serializeError()
    );
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }

  console.error(err);

  logger.error(err);

  res.status(400).send({
    message: "Something went wrong",
  });
};

export { errorHandler };
