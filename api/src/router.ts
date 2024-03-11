import { Router } from "express";
import sysdesign from "./component/sysdesign";
import healthcheck from "./component/healthcheck";

const router: Router = Router();

router.post("/sysdesign", sysdesign);
router.get("/healthcheck", healthcheck);

export default router;
