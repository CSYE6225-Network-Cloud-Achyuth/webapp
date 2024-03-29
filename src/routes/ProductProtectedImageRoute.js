import { Router } from "express";
import multer from "multer";
import BadRequestException from "../errors/BadRequest.js";
import { checkAuthorization } from "../middleware/CheckAuthorization.js";
import {
  ImageUpload,
  ImageDelete,
  ImageGetAll,
  ImageGetSpecific,
} from "../service/ImageService.js";
import * as url from "url";
import { checkIdValidationIntheUrl } from "../middleware/CheckIdValidationInUrl.js";
import { checkIfProductExistsAndCheckTheOwner } from "../middleware/CheckIfProductExistsAndCheckOwner.js";
import { checkValidIdProductUrl } from "../middleware/checkValidProductIdUrl.js";
import { CheckIfValidProductIDAndImageIdGiven } from "../middleware/CheckIfValidProductIDAndImageIdGiven.js";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
import { logger } from "../winston-log/winston.js";
import { sdc } from "../statsd/StatsD.js";

const upload = multer({
  dest: __dirname + "uploads/",
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      callback(null, false);
      logger.error("Provided invalid file extension...");
      return callback(
        new BadRequestException("Only .png, .jpg and .jpeg format are allowed")
      );
    }
  },
});

const router = Router();

router.post(
  "/v1/product/:productId/image",
  upload.single("image"),
  checkAuthorization,
  checkValidIdProductUrl,
  checkIfProductExistsAndCheckTheOwner,
  async (request, response) => {
    try {
      const file = request.file;

      if (file === undefined || file === null) {
        logger.error("User didn't provide the file");
        throw new BadRequestException("Please provide the file");
      }

      const result = await ImageUpload(
        file,
        request.params.productId,
        request.response
      );

      logger.info("Successfully uploaded the image to the S3 Bucket");

      sdc.increment("webapp.postImage");

      response.send(result);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
);

router.get(
  "/v1/product/:productId/image",
  checkAuthorization,
  checkValidIdProductUrl,
  checkIfProductExistsAndCheckTheOwner,
  async (request, response) => {
    const result = await ImageGetAll(request.params.productId);

    logger.info("Successfully fetched the image details");

    sdc.increment("webapp.getImage");

    response.send(result);
  }
);

router.get(
  "/v1/product/:productId/image/:imageId",
  checkAuthorization,
  checkValidIdProductUrl,
  checkIfProductExistsAndCheckTheOwner,
  CheckIfValidProductIDAndImageIdGiven,
  async (request, response) => {
    const { productId, imageId } = request.params;

    logger.info(
      "Successfully fetched the image details for specific image id: " + imageId
    );

    const result = await ImageGetSpecific(productId, imageId);

    sdc.increment("webapp.getImageById");

    response.send(result);
  }
);

router.delete(
  "/v1/product/:productId/image/:imageId",
  checkAuthorization,
  checkValidIdProductUrl,
  checkIfProductExistsAndCheckTheOwner,
  CheckIfValidProductIDAndImageIdGiven,
  async (request, response) => {
    const { productId, imageId } = request.params;

    logger.info("Successfully deleted the image details");

    await ImageDelete(productId, imageId);

    sdc.increment("webapp.deleteImage");

    response.status(204).send();
  }
);

export { router as ImageRouter };
