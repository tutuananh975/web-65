import express from "express";

const router = express.Router();

router.get("/login", (req, res) => {
  res.send("Login roi");
});
router.get("/register", (req, res) => {});

export default router;
