import { app } from "./app.js";
import { sequelize } from "./db/Sequalize.js";
import { sync, User } from "./Models/User.js";
import { Product, syncProduct } from "./Models/Product.js";
import { Image } from "./Models/Image.js";
import * as dotenv from "dotenv";
dotenv.config();
import { sdc } from "./statsd/StatsD.js";
import { logger, winston } from "./winston-log/winston.js";
// import winston from "winston";

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
    .sync({ alter: true })
    .then(() => {
      console.log("Created all the tables!!");
    })
    .catch((err) => {
      console.error(err);
    });

  // User.hasMany(Product, { as: "products" });
  Product.belongsTo(User, {
    foreignKey: "owner_user_id",
    as: "user",
  });

  Image.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
  });

  if (process.env.NODE_ENV !== "production") {
    console.log("Inside Process.env file!!");
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }

  sdc.socket.on("error", function (error) {
    return console.error("Error in socket: ", error);
  });

  app.listen(PORT, () => {
    console.log(`Running on PORT: ${PORT}`);
  });
};

start();
