import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { UserRoute } from "./src/routes/user.js"; 
import { AccountRouter } from "./src/routes/account.js";
import middleware from "./src/middleware/middleware.js";

dotenv.config();

const app = express();
const mongoURI = process.env.MONGO_STRING;

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", UserRoute);
app.use("/api/v1/account",middleware,AccountRouter);

async function main() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected To MongoDB");
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server Running On Port ${PORT}`);
    });
  } catch (error) {
    console.log(`Failed to connect to MongoDB ${error}`);
  }
}
main();
