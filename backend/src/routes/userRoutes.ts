import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { getProfile, updateProfile } from "../controllers/userController/userController.js";

const router = Router();

router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);

export default router;