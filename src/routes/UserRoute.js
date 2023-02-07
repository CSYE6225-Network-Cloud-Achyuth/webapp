import { Router } from "express";
import { checkAuthorization } from "../middleware/CheckAuthorization.js";
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
  checkAuthorization,
  async (request, response) => {
    const { productId } = request.params;

    console.log("Product ID: " + productId);

    const returnedProductData = await getProductById(productId);

    console.log(returnedProductData);

    response.status(200).send(returnedProductData);
  }
);

export { router as userRouter };
