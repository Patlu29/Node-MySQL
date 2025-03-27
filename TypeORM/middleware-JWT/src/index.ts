import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/authRoutes";
// import { bgJob } from "./bacground-jobs/cornJobs";
// import  errorHandler  from "errorhandler";


const app = express();
app.use(bodyParser.json());
// app.use(errorHandler())
AppDataSource.initialize().then(() => {
  console.log("Connected to database");

  app.use("/auth", authRoutes);

  app.listen(3900, () => {
    console.log("Server is running on port 3900");
  });
});
