import express from "express";

const router = express.Router();

// Define your API endpoints here
router.get("/example", (req, res) => {
	res.json({ message: "This is an example API endpoint" });
});

export default router;
