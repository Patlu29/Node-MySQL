import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { route } from "./routes";
import { Flight } from "./entity/Flight";

// create express app
const app: express.Application = express();
app.use(express.json());

app.use("/airPort", route);

app.get("/", (req: any, res: any) => {
  console.log("checking");
  return res.status(200).json({ message: " Express Works" });
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
