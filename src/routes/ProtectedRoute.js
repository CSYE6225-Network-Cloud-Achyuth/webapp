import { Router } from "express";
import ForbiddenAccess from "../errors/ForbiddenAccess.js";
import { checkAuthorization } from "../middleware/CheckAuthorization.js";
import { checkIdValidationInTheProductUrl } from "../middleware/CheckIdValidationInTheProductUrl.js";
import { checkIdValidationIntheUrl } from "../middleware/CheckIdValidationInUrl.js";
import { checkIfAllTheContentIsGivenInProduct } from "../middleware/CheckIfAllTheContentIsGivenInProduct.js";
import { checkIfProductExistsAndCheckTheOwner } from "../middleware/CheckIfProductExistsAndCheckOwner.js";
import { checkPayloadKeyValueEmpty } from "../middleware/CheckPutPayloadContent.js";
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

    res.status(204).send();
  }
);

router.post(
  "/v1/product",
  emptyContentCheckMiddleware,
  checkIfAllTheContentIsGivenInProduct,
  checkAuthorization,
  async (req, res) => {
    const createdProduct = await createProduct(req.body, req.response.id);

    await res.send(createdProduct);
  }
);

router.patch(
  "/v1/product/:productId",
  emptyContentCheckMiddleware,
  checkIdValidationInTheProductUrl,
  checkAuthorization,
  checkIfProductExistsAndCheckTheOwner,
  async (req, res) => {
    await updateProductPatch(req.body, req.params.productId);

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
  async (req, res) => {
    await updateProductPut(req.body, req.params.productId);

    await res.status().send();
  }
);

router.delete(
  "/v1/product/:productId",
  checkIdValidationInTheProductUrl,
  checkAuthorization,
  checkIfProductExistsAndCheckTheOwner,
  async (req, res) => {
    const { productId } = req.params;

    await deleteProduct(productId);

    await res.status(204).send();
  }
);

export { router as ProtectedRoutes };
