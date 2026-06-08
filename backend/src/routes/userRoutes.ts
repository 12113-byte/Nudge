import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json({ httpMethod: "get" });
});

router.get("/:id", (req: Request, res: Response) => {
    res.json({ message: "Hello" });
});


export default router;