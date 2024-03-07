import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
