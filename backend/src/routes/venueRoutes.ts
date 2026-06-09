import { Router } from "express";
import {
  createVenue,
  getVenueById,
  getVenueByName,
  getVenues,
} from "../controllers/venueController.js";

const router = Router();

router.post("/create", createVenue);
router.get("/", getVenues);
router.get("/search", getVenueByName);
router.get("/:venueId", getVenueById);

export default router;
