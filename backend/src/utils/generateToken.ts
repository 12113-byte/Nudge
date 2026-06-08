import jwt, { SignOptions } from 'jsonwebtoken';
import { Response } from "express";

export const generateToken = (userId: number, res: Response): string => {
    const payload = {id: userId};

    const options: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"],
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, options);

    // Set cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: (1000 * 60 * 60 * 24) * 7,
    });

    return token;
};
