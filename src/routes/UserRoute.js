import { Router } from "express";
import ProductNotFound from "../errors/ProductNotFound.js";
import { checkAuthorization } from "../middleware/CheckAuthorization.js";
import { checkIdValidationInTheProductUrl } from "../middleware/CheckIdValidationInTheProductUrl.js";
import { emptyContent } from "../middleware/CheckIfEmptyContent.js";
import { checkEmailRegex } from "../middleware/EmailRegexMiddleware.js";
import { encryptPassword } from "../middleware/EncryptPassword.js";
import { findIfEmailExistsMiddleWare } from "../middleware/FindEmail.js";
import { checkPasswordRegex } from "../middleware/PasswordRegexMiddleWare.js";
import { getProductById } from "../service/ProductService.js";
import { userCreate } from "../service/UserService.js";

const router = Router();

router.post(
  "/v1/user",
  emptyContent,
  checkEmailRegex,
  checkPasswordRegex,
  findIfEmailExistsMiddleWare,
  encryptPassword,
  async (request, response) => {
    const returnedData = await userCreate(request.body);

    delete returnedData["password"];

    response.status(201).send(returnedData);
  }
);

router.get("/healthz", async (request, respond) => {
  respond.status(200).send();
});

router.get(
  "/v1/product/:productId",
  checkIdValidationInTheProductUrl,
  async (request, response) => {
    const { productId } = request.params;

    console.log("Product ID: " + productId);

    const returnedProductData = await getProductById(productId);

    if (returnedProductData === null || returnedProductData === undefined)
      throw new ProductNotFound("Product Not found for this id: " + productId);

    response.status(200).send(returnedProductData);
  }
);

export { router as userRouter };
