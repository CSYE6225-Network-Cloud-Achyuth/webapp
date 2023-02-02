import SameEmailFound from "../errors/SameEmailFound.js";
import { findIfEmailExists } from "../service/UserService.js";

const findIfEmailExistsMiddleWare = async (req, res, next) => {
  const { username } = req.body;

  const response = await findIfEmailExists(username);

  if (response) {
    throw new SameEmailFound(`Given Username is already taken:  ${username}`);
  } else {
    next();
  }
};

export { findIfEmailExistsMiddleWare };
