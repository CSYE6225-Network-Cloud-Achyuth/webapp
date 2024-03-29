import { Router } from "express";
import ForbiddenAccess from "../errors/ForbiddenAccess.js";
import { checkAuthorization } from "../middleware/CheckAuthorization.js";
import { checkIdValidationInTheProductUrl } from "../middleware/CheckIdValidationInTheProductUrl.js";
import { checkIdValidationIntheUrl } from "../middleware/CheckIdValidationInUrl.js";
import { checkIfAllTheContentIsGivenInProduct } from "../middleware/CheckIfAllTheContentIsGivenInProduct.js";
import { checkIfProductExistsAndCheckTheOwner } from "../middleware/CheckIfProductExistsAndCheckOwner.js";
import { checkPayloadKeyValueEmpty } from "../middleware/CheckPutPayloadContent.js";
import { checkQuantityNumber } from "../middleware/CheckQuantityNumber.js";
import { emptyContentCheckMiddleware } from "../middleware/EmptyContentCheckMiddleware.js";
import { checkPasswordRegex } from "../middleware/PasswordRegexMiddleWare.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  updateProductPatch,
  updateProductPut,
} from "../service/ProductService.js";
import { getUserById, updateTheGivenFields } from "../service/UserService.js";
import { sdc } from "../statsd/StatsD.js";
import { logger } from "../winston-log/winston.js";

const router = Router();

router.get(
  "/v1/user/:userId",
  checkAuthorization,
  checkIdValidationIntheUrl,
  async (req, res) => {
    const { id } = req.response;

    if (id.toString() !== req.params.userId) {
      throw new ForbiddenAccess("Forbidden Access");
    }
    const userDetails = await getUserById(req.params.userId);

    delete userDetails.dataValues["password"];

    logger.info("Fetched user details: " + JSON.stringify(userDetails));

    sdc.increment("webapp.getUserById");

    res.status(200).send(userDetails);
  }
);

router.put(
  "/v1/user/:userId",
  emptyContentCheckMiddleware,
  checkIdValidationIntheUrl,
  checkAuthorization,
  checkPayloadKeyValueEmpty,
  checkPasswordRegex,
  async (req, res) => {
    const { id } = req.response;

    if (id.toString() !== req.params.userId) {
      throw new ForbiddenAccess("Forbidden Access");
    }

    await updateTheGivenFields(req.body, req.params.userId);

    logger.info("Updated user details: " + JSON.stringify(userDetails));

    sdc.increment("webapp.putUserById");

    res.status(204).send();
  }
);

router.post(
  "/v1/product",
  emptyContentCheckMiddleware,
  checkIfAllTheContentIsGivenInProduct,
  checkAuthorization,
  checkQuantityNumber,
  async (req, res) => {
    const createdProduct = await createProduct(req.body, req.response.id);
    logger.info("Created product: " + JSON.stringify(createdProduct));
    sdc.increment("webapp.postProduct");
    await res.send(createdProduct);
  }
);

router.patch(
  "/v1/product/:productId",
  emptyContentCheckMiddleware,
  checkIdValidationInTheProductUrl,
  checkAuthorization,
  checkIfProductExistsAndCheckTheOwner,
  checkQuantityNumber,
  async (req, res) => {
    await updateProductPatch(req.body, req.params.productId);

    logger.info("Patched product: " + req.params.productId);

    sdc.increment("webapp.patchProductById");

    await res.status(204).send();
  }
);

router.put(
  "/v1/product/:productId",
  emptyContentCheckMiddleware,
  checkIdValidationInTheProductUrl,
  checkAuthorization,
  checkIfProductExistsAndCheckTheOwner,
  checkIfAllTheContentIsGivenInProduct,
  checkQuantityNumber,
  async (req, res) => {
    await updateProductPut(req.body, req.params.productId);

    logger.info("Updated the product successfully: " + req.params.productId);

    sdc.increment("webapp.putProductById");

    await res.status(204).send();
  }
);

router.delete(
  "/v1/product/:productId",
  checkIdValidationInTheProductUrl,
  checkAuthorization,
  checkIfProductExistsAndCheckTheOwner,
  async (req, res) => {
    const { productId } = req.params;

    logger.info("Deleted the product successfully!: " + productId);

    await deleteProduct(productId);

    sdc.increment("webapp.deleteProductById");

    await res.status(204).send();
  }
);

export { router as ProtectedRoutes };
