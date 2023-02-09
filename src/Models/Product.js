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
      // allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      // allowNull: false,
      unique: {
        arg: true,
        msg: "SKU already taken! Give another unique SKU",
      },
    },
    manufacturer: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100,
      },
      // allowNull: false,
    },
    date_added: {
      type: DataTypes.DATE,
      // allowNull: false,
    },
    date_last_updated: {
      type: DataTypes.DATE,
      // allowNull: false,
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
