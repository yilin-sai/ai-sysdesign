import { Router } from "express";
import gpt from "./component/gpt";

const router: Router = Router();

router.get("/gpt", gpt);

export default router;
