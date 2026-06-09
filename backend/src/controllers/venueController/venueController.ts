import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/db";

const createVenue = async (req: Request, res: Response, next: NextFunction) => {
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
  } = req.body;

  try {
    //Check if venue already exists
    const venueExists = await prisma.venue.findUnique({
      where: { email },
    });

    if (venueExists) {
      throw new Error("Venue already exists with this email");
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
    next(err);
  }
};

const getVenues = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const allVenues = await prisma.venue.findMany();

    res.status(200).json({
      status: "success",
      data: {
        allVenues,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getVenueById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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
    next(err);
  }
};

const getVenueByName = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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
    next(err);
  }
};

// const updateVenue = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const venue =
//   }
// }

//getVenueByOwnerId

//deleteVenue

export { createVenue, getVenueById, getVenueByName, getVenues };
