import { Product } from "../Models/Product.js";
import { User } from "../Models/User.js";

const createProduct = async (body, userId) => {
  const { name } = body;

  const account_created = Date.now();

  const account_updated = Date.now();

  try {
    const productResponse = await Product.create({
      product_name: name,
      user_id: userId,
    });
    return await productResponse;
  } catch (err) {
    console.error("Failed to create product" + err);
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

export { createProduct, getProductById };
