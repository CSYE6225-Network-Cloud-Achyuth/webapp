import BadRequestException from "../errors/BadRequest.js";

const emptyContentCheckMiddleware = async (req, res, next) => {
  if (
    req.body && // 👈 null and undefined check
    Object.keys(req.body).length === 0 &&
    Object.getPrototypeOf(req.body) === Object.prototype
  ) {
    throw new BadRequestException("Empty Payload!");
  }

  next();
};

export { emptyContentCheckMiddleware };
