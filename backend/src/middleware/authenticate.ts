import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Read token from cookie, fall back to Authorization header
        let token = req.cookies?.jwt;

        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader?.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            }
        }

        if (!token) {
            res.status(401).json({ error: "Not authenticated" });
            return;
        }
    
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

        // Fetch user and attach to request
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });

        if (!user) {
            res.status(401).json({ error: "User no longer exists" });
            return;
        }

        // Attaches the full user object (fetched from DB) onto the request
        req.user = user;
        // Hands off to the next function in the chain
        next();
    } catch (err) {
        // jwt.verify throws on invalid/expired tokens
        res.status(401).json({ error: "Invalid or expired token" });
    }
};

export { authenticate };