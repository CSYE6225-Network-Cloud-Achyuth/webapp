import NotAuthorizedError from "../errors/NotAuthorized.js";
import { findIfEmailExists } from "../service/UserService.js";
import PasswordHash from "../utils/Password_hash.js";
import { logger } from "../winston-log/winston.js";

const checkAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization === undefined) {
    logger.error("User didn't provide the Auth code");
    throw new NotAuthorizedError("Authorization code not found");
  }

  const authorizationToken = authorization.split(" ")[1];

  const stringValue = Buffer.from(authorizationToken, "base64").toString();

  const [username, password] = stringValue.split(":");

  const response = await findIfEmailExists(username);

  console.log("Here is the Email: " + response);

  if (response === null) {
    logger.error("Invalid Email");

    throw new NotAuthorizedError("Invalid Email");
  } else {
    const match = await PasswordHash.comparePassword(
      password,
      response.password
    );

    if (!match) {
      logger.error("Password didn't match");
      throw new NotAuthorizedError("Invalid Password");
    }
  }

  req.response = response.dataValues;

  next();
};

export { checkAuthorization };
