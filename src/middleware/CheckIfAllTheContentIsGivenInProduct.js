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
    throw new BadRequestException("Required attributes are missing or mispelt");
  }
  // Checking If we have given extra fields
  if (Object.keys(req.body).length > 5) {
    throw new BadRequestException("You have given some unnecessary field!");
  }

  if (
    name === "" ||
    description === "" ||
    sku === "" ||
    manufacturer === "" ||
    quantity === ""
  ) {
    throw new BadRequestException(
      "There is a empty value in one of the json field"
    );
  }
  next();
};

export { checkIfAllTheContentIsGivenInProduct };
