import express, { Request, Response, Application, NextFunction } from "express";
import cors from "cors";
import router from "./router";

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/", router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
