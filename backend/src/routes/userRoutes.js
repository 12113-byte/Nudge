import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({httpMethod: "get"});
});

router.get("/:id", (req, res) => {
    res.json({message: "Hello"});
});


export default router;