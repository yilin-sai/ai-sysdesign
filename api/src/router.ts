import { Router } from "express";
import sysdesign from "./component/sysdesign";

const router: Router = Router();

router.post("/sysdesign", sysdesign);

export default router;
