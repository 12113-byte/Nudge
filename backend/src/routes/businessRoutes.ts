import { Router } from "express";
import {
  createBusiness,
  getAllBusinesses,
} from "../controllers/businessController/businessController.js";

const router = Router();

router.post("/register", createBusiness);
router.get("/", getAllBusinesses);

export default router;
