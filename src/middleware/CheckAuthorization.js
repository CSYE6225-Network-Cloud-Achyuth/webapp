import NotAuthorizedError from "../errors/NotAuthorized.js";
import { findIfEmailExists } from "../service/UserService.js";
import PasswordHash from "../utils/Password_hash.js";

const checkAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization === undefined) {
    throw new NotAuthorizedError("Authorization code not found");
  }

  const authorizationToken = authorization.split(" ")[1];

  const stringValue = Buffer.from(authorizationToken, "base64").toString();

  const [username, password] = stringValue.split(":");

  const response = await findIfEmailExists(username);

  if (response === null) {
    throw new NotAuthorizedError("Invalid Email");
  } else {
    const match = await PasswordHash.comparePassword(
      password,
      response.password
    );

    if (!match) throw new NotAuthorizedError("Invalid Password");
  }

  req.response = response.dataValues;

  next();
};

export { checkAuthorization };
