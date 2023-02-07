import { DataTypes } from "sequelize";
import { sequelize } from "../db/Sequalize.js";
import { User } from "./User.js";

const Product = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      noUpdate: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    sku: {
      type: DataTypes.STRING,
      unique: {
        arg: true,
        msg: "SKU already taken! Give another unique SKU",
      },
    },
    manufacturer: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100,
      },
    },
    date_added: {
      type: DataTypes.DATE,
    },
    date_last_updated: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
  }
);

// const productAssociation = Product.hasOne(User);

const syncProduct = () => {
  sequelize
    .sync()
    .then(() => console.log("Product Table Created"))
    .catch((err) => console.error("Error Creating the product table"));
};

export { Product, syncProduct };
