import BadRequestException from "../errors/BadRequest.js";

const checkIfAllTheContentIsGivenInProduct = async (req, res, next) => {
  const { name, description, sku, manufacturer, quantity } = req.body;

  if (
    name === undefined ||
    description === undefined ||
    sku === undefined ||
    manufacturer === undefined ||
    quantity === undefined
  ) {
    logger.error("Required attributes are missing or mispelt");
    throw new BadRequestException("Required attributes are missing or mispelt");
  }
  // Checking If we have given extra fields
  if (Object.keys(req.body).length > 5) {
    logger.error("You have given some unnecessary field!");
    throw new BadRequestException("You have given some unnecessary field!");
  }

  if (
    name === "" ||
    description === "" ||
    sku === "" ||
    manufacturer === "" ||
    quantity === ""
  ) {
    logger.error("There is a empty value in one of the json field");
    throw new BadRequestException(
      "There is a empty value in one of the json field"
    );
  }
  next();
};

export { checkIfAllTheContentIsGivenInProduct };
