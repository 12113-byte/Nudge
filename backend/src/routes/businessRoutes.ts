import { Router } from "express";
import {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusiness,
} from "../controllers/businessController/businessController.js";

const router = Router();

router.post("/register", createBusiness);
router.get("/", getAllBusinesses);
router.get("/:id", getBusinessById);
router.patch("/profile", updateBusiness);

export default router;
