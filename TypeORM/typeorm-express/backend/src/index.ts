import * as express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { route } from "./routes";
import { Flight } from "./entity/Flight";
import cors = require("cors");

// create express app
const app: express.Application = express();
app.use(express.json());
app.use(cors());

app.use("/airPort", route);

app.get("/", (req: Request, res: Response):Promise<void> => {
  console.log("checking");
  res.status(200).json({ message: " Express Works" });
  return 
});
const port: number = 3900;

AppDataSource.initialize()
  .then(() => {
    console.log("connected to mysql");
    app.listen(port, () => {
      console.log(
        `TypeScript with Express running on --> http://localhost:${port}/`
      );
    });
  })
  .catch((error) => {
    console.log("database error", error.message);
  });
