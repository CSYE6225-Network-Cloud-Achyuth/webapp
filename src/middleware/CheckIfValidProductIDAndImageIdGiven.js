import NotFoundError from "../errors/NotFoundError.js";
import { FindImageIdAndProductId } from "../service/ImageService.js";

const CheckIfValidProductIDAndImageIdGiven = async (req, res, next) => {
  const { productId, imageId } = req.params;

  const response = await FindImageIdAndProductId(productId, imageId);

  if (response === undefined || response === null || response.length === 0) {
    throw new NotFoundError(
      "Please provide the right image id for the product id: " + productId
    );
  }

  next();
};

export { CheckIfValidProductIDAndImageIdGiven };
