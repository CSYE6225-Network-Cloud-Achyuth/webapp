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
const upload = multer({
  dest: "uploads/",
  // fileFilter: (req, file, callback) => {
  //   if (
  //     file.mimetype !== "png" ||
  //     file.mimetype !== "image/jpg" ||
  //     file.mimetype !== "image/jpeg"
  //   ) {
  //     throw new BadRequestException(
  //       "Invalid Image Type!, please give the valid image extension"
  //     );
  //   }
  // },
});

const router = Router();

router.post(
  "/v1/product/:productId/image",
  upload.single("image"),
  checkAuthorization,
  async (request, response) => {
    try {
      const file = request.file;

      console.log(request.response);

      const result = await ImageUpload(
        file,
        request.params.productId,
        request.response
      );

      response.send(result);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
);

router.get(
  "/v1/product/:productId/image",
  checkAuthorization,
  async (request, response) => {
    const result = await ImageGetAll(request.params.productId);

    response.send(result);
  }
);

router.get(
  "/v1/product/:productId/image/:imageId",
  checkAuthorization,
  async (request, response) => {
    const { productId, imageId } = request.params;

    const result = await ImageGetSpecific(productId, imageId);

    response.send(result);
  }
);

router.delete(
  "/v1/product/:productId/image/:imageId",
  async (request, response) => {
    const { productId, imageId } = request.params;

    console.log(imageId);

    await ImageDelete(productId, imageId);

    response.status(204).send();
  }
);

export { router as ImageRouter };
