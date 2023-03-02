import { deleteFile, uploadFile } from "./AWSUploadService.js";
import { Image } from "../Models/Image.js";
import { deleteTheFile } from "../utils/AWS_S3.js";
import { Product } from "../Models/Product.js";
import BadRequestException from "../errors/BadRequest.js";
import { v4 } from "uuid";

const ImageUpload = async (file, productId, userDetails) => {
  try {
    // if (!file.mimetype.startWith("images/")) {
    //   throw new BadRequestException("Please give valid image extension");
    // }

    const product = await Product.findByPk(productId);

    const fileName = `UserID:${userDetails.id}/ProductID:${
      product.dataValues.id
    }/${v4()}/${file.originalname}`;

    const imageResponseByFileName = await ImageExistsByFileName(fileName);

    // Seeing if the image already exists
    if (imageResponseByFileName) {
      throw new BadRequestException("Can't give the same image model");
    }

    const result = await uploadFile(file, fileName);

    const imageResponse = await Image.create({
      product_id: productId,
      s3_bucket_path: result.Location,
      file_name: fileName,
      date_created: Date.now(),
    });

    return imageResponse;
  } catch (err) {
    console.log(err);
    throw new BadRequestException(err);
  }
};

const ImageGetAll = async (productId) => {
  try {
    const imageResponse = await Image.findAll({
      where: { product_id: productId },
    });

    return await imageResponse;
  } catch (error) {
    console.error(error);
    throw new BadRequestException(error);
  }
};

const ImageGetSpecific = async (productId, imageId) => {
  try {
    const imageResponse = await Image.findOne({
      where: { product_id: productId, image_id: imageId },
    });

    return await imageResponse;
  } catch (error) {
    console.error(error);
    throw new BadRequestException(error);
  }
};

const ImageExistsByFileName = async (fileName) => {
  const imageResponse = await Image.findOne({
    where: {
      file_name: fileName,
    },
  });

  return await imageResponse;
};

const ImageDelete = async (productId, imageId) => {
  const imageResponse = await Image.findByPk(imageId);

  const fileName = imageResponse["file_name"];

  await deleteFile(fileName);

  const imageDelete = await Image.destroy({
    where: {
      product_id: productId,
      image_id: imageId,
    },
  });

  return await imageDelete;
};

const FindImageIdAndProductId = async (product_id, image_id) => {
  try {
    const imageResponse = await Image.findOne({
      where: {
        image_id,
        product_id,
      },
    });
    return await imageResponse;
  } catch (error) {
    throw new BadRequestException(error);
  }
};

export {
  ImageUpload,
  ImageDelete,
  ImageGetAll,
  ImageGetSpecific,
  FindImageIdAndProductId,
};
