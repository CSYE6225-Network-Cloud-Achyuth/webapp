import BadRequestException from "../errors/BadRequest.js";
import InvalidEmail from "../errors/InvalidEmail.js";

const checkEmailRegex = async (req, res, next) => {
  const { username, password } = req.body;

  if (username === "") {
    throw new BadRequestException("Username not given");
  }

  const emailRegex = new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  );

  if (!emailRegex.test(username)) {
    throw new InvalidEmail("Please give valid email");
  }

  next();
};

export { checkEmailRegex };
