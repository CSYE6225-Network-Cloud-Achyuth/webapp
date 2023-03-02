import BadRequestException from "../errors/BadRequest.js";

const checkValidImageIDUrl = async (req, res, next) => {
  const isNumeric = function (str) {
    if (typeof str != "string") return false; // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  };

  if (!isNumeric(req.params.imageId)) {
    throw new BadRequestException(
      "Please give the valid number of the image id in the url"
    );
  }

  next();
};

export { checkValidImageIDUrl };
