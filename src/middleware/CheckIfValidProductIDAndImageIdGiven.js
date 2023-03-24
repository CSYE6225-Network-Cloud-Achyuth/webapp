import NotFoundError from "../errors/NotFoundError.js";
import { FindImageIdAndProductId } from "../service/ImageService.js";
import { logger } from "../winston-log/winston.js";

const CheckIfValidProductIDAndImageIdGiven = async (req, res, next) => {
  const { productId, imageId } = req.params;

  const response = await FindImageIdAndProductId(productId, imageId);

  if (response === undefined || response === null || response.length === 0) {
    logger.error(
      "Please provide the right image id for the product id: " + productId
    );

    throw new NotFoundError(
      "Please provide the right image id for the product id: " + productId
    );
  }

  next();
};

export { CheckIfValidProductIDAndImageIdGiven };
