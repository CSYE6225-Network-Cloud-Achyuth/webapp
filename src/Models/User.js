import { DataTypes } from "sequelize";
import { sequelize } from "../db/Sequalize.js";
import { Product } from "./Product.js";

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    account_created: {
      type: DataTypes.DATE,
    },
    account_updated: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
  }
);

const sync = () => {
  sequelize
    .sync()
    .then(() => {
      console.log("Created All The Tables");
    })
    .catch((err) => {
      console.error("Unable to create table: " + err);
    });
};

export { sync, User };
