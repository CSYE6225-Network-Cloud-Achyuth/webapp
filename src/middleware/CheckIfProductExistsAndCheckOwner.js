import BadRequestException from "../errors/BadRequest.js";
import ForbiddenAccess from "../errors/ForbiddenAccess.js";
import ProductNotFound from "../errors/ProductNotFound.js";
import { getProductById } from "../service/ProductService.js";

const checkIfProductExistsAndCheckTheOwner = async (req, res, next) => {
  const { productId } = req.params;

  const owner = req.response;

  const product = await getProductById(productId);

  if (product === null || product === undefined) {
    throw new ProductNotFound("Product with given id not found : " + productId);
  }

  if (owner.id !== product.dataValues.user_id) {
    throw new ForbiddenAccess(
      "Forbidded access to edit the following product id: " + productId
    );
  }

  next();
};

export { checkIfProductExistsAndCheckTheOwner };
