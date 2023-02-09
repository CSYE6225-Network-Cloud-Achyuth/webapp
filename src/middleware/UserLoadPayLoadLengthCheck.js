import BadRequestException from "../errors/BadRequest.js";

const checkPayloadLengthCheckUserPost = async (req, res, next) => {
  if (Object.keys(req.body).length > 4) {
    throw new BadRequestException("You have given additional fields!");
  }

  next();
};

export { checkPayloadLengthCheckUserPost };
