import express, { Request, Response, Application, NextFunction } from "express";
import cors from "cors";
import router from "./router";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: process.env.UI_ORIGIN }));
app.use(express.json());
app.use("/", router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send(err.stack);
});

app.listen(port, '::', () => {
  console.log(`Server is Fire at http://[::]:${port}`);
});
