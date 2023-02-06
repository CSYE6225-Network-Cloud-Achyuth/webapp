import { app } from "./app.js";
import { sequelize } from "./db/Sequalize.js";
import { sync, User } from "./Models/User.js";
import { Product, syncProduct } from "./Models/Product.js";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || "3000";

const start = async () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connected to the Database successfully");
    })
    .catch((err) => {
      console.error("Unable to connect to DB");
    });

  // sync();
  // syncProduct();

  sequelize
    .sync()
    .then(() => {
      console.log("Created all the tables!!");
    })
    .catch((err) => {
      console.error(err);
    });

  // User.hasMany(Product, { as: "products" });
  Product.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
  });

  app.listen(PORT, () => {
    console.log(`Running on PORT: ${PORT}`);
  });
};

start();
