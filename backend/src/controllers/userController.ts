import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db.js";


const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Find User
        const user = await prisma.user.findUnique({
            where: { id: req.user!.id},
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.status(200).json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    is_owner: user.is_owner,
                    created_at: user.created_at,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export { getProfile };