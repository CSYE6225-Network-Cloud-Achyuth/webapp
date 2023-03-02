import CustomError from "../errors/CustomError.js";

const errorHandler = async (err, req, res, next) => {
  console.log("Inside Error Handler");

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }

  console.error(err);

  res.status(400).send({
    message: "Something went wrong",
  });
};

export { errorHandler };
