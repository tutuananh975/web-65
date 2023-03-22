import express from "express";

const router = express.Router();

router.get("/", (req, res) => {}); // api/v1/teachers
router.get("/:teacherId", (req, res) => {}); // api/v1/teachers/1
router.put("/:teacherId", (req, res) => {}); // // api/v1/teachers/1
router.delete("/:teacherId", (req, res) => {}); // api/v1/teachers/1

export default router;
