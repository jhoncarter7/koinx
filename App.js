import express from "express";
import mongodbConnection from "./db/db.js";
import dotenv from "dotenv";
import { fetchAndStoreCoinData } from "./controller/coinData.controller.js";
import CointData from "./routes/coinData.routes.js";

const port = 3000;

dotenv.config({
  path: "./.env",
});



mongodbConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
    process.exit(1);
  });

  const app = express();
  app.use(express.json());

  app.use("/", CointData);

const coinList = ["bitcoin", "ethereum", "matic-network"];

setInterval(async () => {
    for (const coin of coinList) {
      try {
        console.log(`Fetching data for ${coin}`);
        await fetchAndStoreCoinData(coin);
      } catch (error) {
        console.error(`Error fetching data for ${coin}:`, error.message);
      }
    }
  },  2*60*60*1000); 
  






