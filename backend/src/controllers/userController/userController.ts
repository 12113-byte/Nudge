import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/db.js";


const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorised" });
            return;
        }

        res.status(200).json({
            status: "success",
            data: {
                user: {
                    id: req.user.id,
                    first_name: req.user.first_name,
                    last_name: req.user.last_name,
                    email: req.user.email,
                    created_at: req.user.created_at,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorised" });
            return;
        }

        const { first_name, last_name, email } = req.body;
        
        const updated = await prisma.user.update({
            where: { id: req.user.id },
            data: {
                // Only fields that were actually sent get updated
                ...(first_name && { first_name }),
                ...(last_name && { last_name }),
                ...(email && { email }),
            },
            // Controls what Prisma returns after the update
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                created_at: true,
                updated_at: true,
            }
        });

        res.status(200).json({
            status: "success",
            data: { user: updated },
        });
    } catch (err) {
        next(err);
    }
};

export { getProfile, updateProfile };