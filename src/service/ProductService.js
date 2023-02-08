import BadRequestException from "../errors/BadRequest.js";
import { Product } from "../Models/Product.js";
import { User } from "../Models/User.js";

const createProduct = async (body, userId) => {
  const { name, description, sku, manufacturer, quantity } = body;

  const date_added = Date.now();

  const date_last_updated = Date.now();

  try {
    const productResponse = await Product.create({
      name: name,
      description,
      sku,
      manufacturer,
      quantity,
      user_id: userId,
      date_added,
      date_last_updated,
    });
    return await productResponse;
  } catch (err) {
    console.error("Failed to create product" + err);
    throw new BadRequestException(err.toString());
  }
};

const getProductById = async (productId) => {
  try {
    console.log("Get by product id: " + productId);
    // const productResponse = await Product.findByPk(productId, {
    //   include: ["user"],
    // });

    const productResponse = await Product.findByPk(productId);

    return await productResponse;
  } catch (err) {
    console.error("Failed to fetch the product ID: " + err);
    throw new BadRequestException(err.toString());
  }
};

const updateProductPut = async (body, productId) => {
  try {
    const { name, description, sku, manufacturer, quantity } = body;

    console.log(body);

    const date_last_updated = Date.now();

    const productResponse = await Product.update(
      {
        name,
        description,
        sku,
        manufacturer,
        quantity,
        date_last_updated,
      },
      {
        where: {
          id: productId,
        },
      }
    );

    return await productResponse;
  } catch (err) {
    console.error("There is an error in updating product: " + err);
    throw new BadRequestException(err.toString());
  }
};

const updateProductPatch = async (body, productId) => {
  try {
    const productResponse = await Product.update(
      { ...body },
      {
        where: {
          id: productId,
        },
      }
    );

    return await productResponse;
  } catch (err) {
    throw new BadRequestException("Something went wrong!!: " + err);
  }
};

const deleteProduct = async (productId) => {
  try {
    const productResponse = await Product.destroy({
      where: {
        id: productId,
      },
    });

    return await productResponse;
  } catch (err) {
    console.error("There is a problem in deleting the product: " + err);
    throw new BadRequestException(err.toString());
  }
};

export {
  createProduct,
  getProductById,
  updateProductPut,
  updateProductPatch,
  deleteProduct,
};
