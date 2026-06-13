import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../../config/db.js";
import { Business } from "../../generated/prisma/client.js";
import { generateToken } from "../../utils/generateToken.js";
import { SafeBusinessReturnData } from "./businessController.types.js";

const createBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    first_name,
    last_name,
    company_name,
    email,
    address,
    phone_number,
    password,
    abn,
    website,
    about,
    image_urls,
  } = req.body;

  try {
    //Check if venue already exists
    const businessExists = await prisma.business.findUnique({
      where: { email },
    });

    if (businessExists) {
      throw new Error("Business already exists with this email");
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    //Create Business
    const business = await prisma.business.create({
      data: {
        first_name,
        last_name,
        company_name,
        email,
        password_hash,
        address,
        phone_number,
        abn,
        website,
        about,
        image_urls,
      },
    });

    // Generate JWT Token
    const token = generateToken(business.id, res);

    res.status(201).json({
      status: "success",
      data: {
        business: {
          id: business.id,
          first_name: business.first_name,
          last_name: business.last_name,
          company_name: business.company_name,
          email: business.email,
        },
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

const getAllBusinesses = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const allBusinesses: Business[] = await prisma.business.findMany();

    if (!allBusinesses) {
      throw new Error("No businesses found");
    }

    const businessesData: SafeBusinessReturnData[] = allBusinesses.map(
      (business: Business) => {
        const {
          first_name,
          last_name,
          password_hash,
          created_at,
          updated_at,
          ...businessDataToReturn
        } = business;

        return businessDataToReturn;
      },
    );

    res.status(200).json({
      status: "success",
      data: {
        allBusinesses: businessesData,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getBusinessById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    //convert string to number
    const businessId = Number(req.params.id);

    const business: Business | null = await prisma.business.findUnique({
      where: {
        id: businessId,
      },
    });

    if (!business) {
      throw new Error(`No business found with id: ${businessId}`);
    }

    const {
      first_name,
      last_name,
      password_hash,
      created_at,
      updated_at,
      ...businessDataToReturn
    } = business;

    res.status(200).json({
      status: "success",
      data: businessDataToReturn,
    });
  } catch (err) {
    next(err);
  }
};

const updateBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { updateData, id } = req.body;

  try {
    const updatedBusiness = await prisma.business.update({
      where: { id },
      data: updateData,
    });

    const {
      first_name,
      last_name,
      password_hash,
      created_at,
      updated_at,
      ...businessDataToReturn
    } = updatedBusiness;

    res.status(200).json({
      status: "success",
      data: businessDataToReturn,
    });
  } catch (err) {
    next(err);
  }
};

export { createBusiness, getAllBusinesses, getBusinessById, updateBusiness };

//TODO
//add jwt authentication to the update and delete endpoints
