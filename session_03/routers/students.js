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

router.get("/", (req, res) => {
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

  res.status(200).send(students);
});

router.post("/create", (req, res) => {
  students.push(req.body);
  res.status(201).json({
    message: "create succsess",
    data: req.body,
  });
});

// CRUD

router.get("/read", (req, res) => {
  // res.send(students);
  res.status(200).json({
    message: "read success",
    data: students,
  });
});

router.get("/read-delete", (req, res) => {
  const { flag, id } = req.query;
  if (flag === "DELETE") {
    for (let i = 0; i < students.length; i++) {
      if (students[i].id === Number(id)) {
        students.splice(i, 1);
      }
    }
    res.send(students);
  }
});

router.put("/update/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  let isFounded = false;
  const dataUpdate = req.body;

  for (let i = 0; i < students.length; i++) {
    if (students[i].id === Number(studentId)) {
      isFounded = true;
      students[i] = {
        ...students[i],
        ...dataUpdate,
      };
    }
  }

  if (isFounded === true) {
    res.send("OK");
  } else {
    res.send("Not found");
  }
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < students.length; i++) {
    if (students[i].id === Number(id)) {
      students[i] = {
        ...students[i],
        ...req.body,
      };
    }
  }
  res.send(students);
});

export default router;
