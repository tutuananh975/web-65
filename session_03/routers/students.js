// CRUD: Create, Read, Update, Delete
import express from "express";

const router = express.Router();
const students = [
  { id: 1, 
    name: "Alice" 
  },
  {
    id: 2,
    name: "Bob",
  },
];

router.get("/", (req, res) => {
  res.status(200).send(students);
});

router.get("/:id", (req, res) => {
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

router.post("/", (req, res) => {
  students.push(req.body);
  res.status(201).json(students);
});
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const newStudents = students.map(student => {
    if(student.id === Number(id)) return req.body;
    else return student;
  })
  res.status(200).json(newStudents);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const studentDelete = students.find(student => {
    return student.id === id;
  })
  const index = students.indexOf(studentDelete);
  students.splice(index, 1);
  res.status(200).json(students);
});

export default router;
