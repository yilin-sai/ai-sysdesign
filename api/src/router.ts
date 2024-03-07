import { Router } from "express";
import gpt from "./component/gpt";
import pythonrunner from "./component/pythonrunner";

const router: Router = Router();

router.post("/gpt", gpt);
router.post("/pythonrunner", pythonrunner);

export default router;
