import BadRequestException from "../errors/BadRequest.js";
import PasswordHash from "../utils/Password_hash.js";

const encryptPassword = async (req, res, next) => {
  const { password } = req.body;

  const encryptedPassword = await PasswordHash.toHash(password);

  req.body["password"] = await encryptedPassword;

  next();
};

export { encryptPassword };
