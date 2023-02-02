import { DataTypes } from "sequelize";
import { sequalize } from "../db/Sequalize.js";

const User = sequalize.define(
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
  sequalize
    .sync()
    .then(() => {
      console.log("User Table Created");
    })
    .catch((err) => {
      console.error("Unable to create table: " + err);
    });
};

export { sync, User };
