import BadRequestException from "../errors/BadRequest.js";

const checkPayloadKeyValueEmpty = async (req, res, next) => {
  const { first_name, last_name, password } = req.body;

  if (first_name !== undefined) {
    if (first_name.length === 0) {
      throw new BadRequestException("Please give something in the first name");
    }
  }

  if (last_name !== undefined) {
    if (last_name.length === 0) {
      throw new BadRequestException("Please give something in the last name");
    }
  }

  if (password !== undefined) {
    if (password.length === 0) {
      throw new BadRequestException("Please give something in the password");
    }
  }

  next();
};

export { checkPayloadKeyValueEmpty };
