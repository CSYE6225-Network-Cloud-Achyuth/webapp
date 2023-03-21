import BadRequestException from "../errors/BadRequest.js";
import InvalidEmail from "../errors/InvalidEmail.js";
import { logger } from "../winston-log/winston.js";

const checkEmailRegex = async (req, res, next) => {
  const { username, password } = req.body;

  if (username === "") {
    logger.error("Username not given");
    throw new BadRequestException("Username not given");
  }

  const emailRegex = new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  );

  if (!emailRegex.test(username)) {
    logger.error("Provided invalid email: " + username);
    throw new InvalidEmail("Please give valid email");
  }

  next();
};

export { checkEmailRegex };
