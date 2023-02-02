import BadRequestException from "../errors/BadRequest.js";

const checkPasswordRegex = async (req, res, next) => {
  const { password } = req.body;

  if (password === "") {
    throw new BadRequestException("Password not given");
  }

  // Min 8 Characters, At least one letter and one number
  const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/);

  if (!passwordRegex.test(password) || password === "") {
    throw new BadRequestException(
      "Please give valid english alphabet and one number in the password with min length of 3"
    );
  }

  next();
};

export { checkPasswordRegex };
