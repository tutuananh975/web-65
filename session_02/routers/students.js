// CRUD: Create, Read, Update, Delete
import express from "express";

const router = express.Router();
const students = [
  { id: 1, name: "Alice" },
  {
    id: 2,
    name: "Bob",
  },
];

router.get("/:id", (req, res) => {
  console.log(req.params);
  // if (Object.keys(req.query).length > 0) {
  //   const { name } = req.query;
  //   res.send(students.find((student) => student.name === name));
  // } else {
  //   res.send(students);
  // }

  const student = students.find(
    (student) => student.id === Number(req.params.id)
  );

  res.status(200).send(student);
});
router.get("/create", (req, res) => {});
router.get("/read", (req, res) => {
  res.send("Read students");
});
router.get("/update", (req, res) => {});
router.get("/delete", (req, res) => {});

export default router;
