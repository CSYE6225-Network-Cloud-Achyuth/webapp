import BadRequestException from "../errors/BadRequest.js";

const emptyContent = async (req, res, next) => {
  const { first_name, last_name, username, password } = req.body;

  if (
    first_name === undefined ||
    last_name === undefined ||
    username === undefined ||
    password === undefined
  ) {
    throw new BadRequestException(
      "Missing Content Payload or incorrect json keys"
    );
  } else {
    next();
  }
};

export { emptyContent };
