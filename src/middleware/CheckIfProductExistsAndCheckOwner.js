import ForbiddenAccess from "../errors/ForbiddenAccess.js";
import ProductNotFound from "../errors/ProductNotFound.js";
import { getProductById } from "../service/ProductService.js";

const checkIfProductExistsAndCheckTheOwner = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const owner = req.response;

    const product = await getProductById(productId);

    if (product === null || product === undefined) {
      throw new ProductNotFound(
        "Product with given id not found : " + productId
      );
    }

    console.log("This is the owner");
    console.log(owner.id);

    console.log("this is the product");
    console.log(product.user.dataValues.id);

    if (owner.id !== product.user.dataValues.id) {
      throw new ForbiddenAccess(
        "Forbidded access to edit the following product id: " + productId
      );
    }

    next();
  } catch (err) {
    console.error("Error in Check If Product Exists middleware: " + err);
  }
};

export { checkIfProductExistsAndCheckTheOwner };
