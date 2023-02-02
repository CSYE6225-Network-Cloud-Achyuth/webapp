import { app } from "./app.js";
import { sequalize } from "./db/Sequalize.js";
import { sync } from "./Models/User.js";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || "3000";

const start = async () => {
  sequalize
    .authenticate()
    .then(() => {
      console.log("Connected to the Database successfully");
    })
    .catch((err) => {
      console.error("Unable to connect to DB");
    });

  sync();

  app.listen(PORT, () => {
    console.log(`Running on PORT: ${PORT}`);
  });
};

start();
