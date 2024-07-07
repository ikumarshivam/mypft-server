import express, { Express } from 'express';
import mongoose from 'mongoose';
import financialRecordRouter from "./routes/financial-record";
import cors from "cors";
require("dotenv").config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string = process.env.MONGO_URI || '';
if (!mongoURI) {
  console.error("MongoDB connection string is missing in .env file");
  process.exit(1); // Exit the application
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
