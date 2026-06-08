import { Request, Response } from "express";
import { prisma } from "../config/db.js";

const createVenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      owner_id,
      name,
      email,
      address,
      phone_number,
      website,
      about,
      image_urls,
      latitude,
      longitude,
    } = req.body as {
      owner_id: number;
      name: string;
      email: string;
      address: string;
      phone_number: string;
      website: string;
      about: string;
      image_urls: string[];
      latitude: number;
      longitude: number;
    };

    //Check if venue already exists
    const venueExists = await prisma.venue.findUnique({
      where: { email },
    });

    if (venueExists) {
      res.status(400).json({ error: "Venue already exists with this email" });
      return;
    }

    //Create Venue
    const venue = await prisma.venue.create({
      data: {
        owner: {
          connect: { id: owner_id },
        },
        name,
        email,
        address,
        phone_number,
        website,
        about,
        image_urls,
        latitude,
        longitude,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        venue: {
          id: venue.id,
          owner: venue.owner_id,
          name: venue.name,
          email: venue.email,
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
};

const getVenues = async (req: Request, res: Response): Promise<void> => {
  try {
    const allVenues = await prisma.venue.findMany();

    res.status(200).json({
      status: "success",
      data: {
        allVenues,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
};

const getVenueById = async (req: Request, res: Response): Promise<void> => {
  try {
    //convert string to number
    const venue_id = Number(req.params.venueId);

    const venue = await prisma.venue.findUnique({
      where: {
        id: venue_id,
      },
    });

    if (!venue) {
      res.status(404).json({
        error: "No venue found with that id",
      });
    }

    if (venue) {
      res.status(200).json({
        status: "success",
        data: {
          venue,
        },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
};

const getVenueByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const { venue_name } = req.body;

    const venue = await prisma.venue.findMany({
      where: {
        name: {
          contains: venue_name,
          mode: "insensitive",
        },
      },
    });

    if (!venue) {
      res.status(404).json({
        status: "Venue not found with that name",
      });
      return;
    }

    if (venue) {
      res.status(200).json({
        status: "success",
        data: {
          venue,
        },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
};

const updateVenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const venue =
  }
}

//getVenueByOwnerId



//deleteVenue

export { createVenue, getVenueById, getVenueByName, getVenues };
