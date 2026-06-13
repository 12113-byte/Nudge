import { Router } from "express";
import {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
  loginBusiness,
  updateBusiness,
} from "../controllers/businessController/businessController.js";

const router = Router();

router.get("/", getAllBusinesses);
router.post("/register", createBusiness);
router.post("/login", loginBusiness);
router.patch("/profile", updateBusiness);
router.get("/:id", getBusinessById);

export default router;
