import { DataTypes } from "sequelize";
import { sequelize } from "../db/Sequalize.js";
import { User } from "./User.js";

const Product = sequelize.define("products", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    noUpdate: true,
  },
  product_name: {
    type: DataTypes.STRING,
  },
});

// const productAssociation = Product.hasOne(User);

const syncProduct = () => {
  sequelize
    .sync()
    .then(() => console.log("Product Table Created"))
    .catch((err) => console.error("Error Creating the product table"));
};

export { Product, syncProduct };
