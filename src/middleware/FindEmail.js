import SameEmailFound from "../errors/SameEmailFound.js";
import { findIfEmailExists } from "../service/UserService.js";
import { logger } from "../winston-log/winston.js";

const findIfEmailExistsMiddleWare = async (req, res, next) => {
  const { username } = req.body;

  const response = await findIfEmailExists(username);

  if (response) {
    logger.error("Given the username that has already existed before..");

    throw new SameEmailFound(`Given Username is already taken:  ${username}`);
  } else {
    next();
  }
};

export { findIfEmailExistsMiddleWare };
