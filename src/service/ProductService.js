import BadRequestException from "../errors/BadRequest.js";
import { Product } from "../Models/Product.js";
import { User } from "../Models/User.js";

const createProduct = async (body, userId) => {
  const { name, description, sku, manufacturer, quantity } = body;

  const account_created = Date.now();

  const account_updated = Date.now();

  try {
    const productResponse = await Product.create({
      name: name,
      description,
      sku,
      manufacturer,
      quantity,
      user_id: userId,
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
    const productResponse = await Product.findByPk(productId, {
      include: ["user"],
    });
    return await productResponse;
  } catch (err) {
    console.error("Failed to fetch the product ID: " + err);
  }
};

const updateProductPut = async (body, userId) => {
  try {
    const { name, description, sku, manufacturer, quantity } = body;

    const productResponse = await Product.update(
      {
        name,
        description,
        sku,
        manufacturer,
        quantity,
      },
      {
        where: {
          user_id: userId,
        },
      }
    );

    return await productResponse;
  } catch (err) {
    console.error("There is an error in updating product: " + err);
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

export { createProduct, getProductById, updateProductPut, deleteProduct };
