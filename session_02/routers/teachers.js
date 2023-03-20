import express from "express";

const router = express.Router();

const teachers = [
    {
        id: 1,
        name: "Tuan Anh",
        age: 18
    },
    {
        id: 2,
        name: "Tuan Em",
        age: 16
    }
]

router.get("/", (req, res) => {
    return res.status(200).json(teachers);
});
router.get("/:id", (req, res) => {
    const teacher = teachers.find(item => item.id === Number(req.params.id));
    res.status(200).json(teacher);
});

router.post("/", (req, res) => {
    const newId = teachers[teachers.length - 1].id + 1;
    const newTeacher = {
        id: newId,
        ...req.body
    }
    teachers.push(newTeacher);
    res.status(201).json(teachers);
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const teacherEdit = teachers.find(teacher => teacher.id === id);
    const teacherEditIndex = teachers.indexOf(teacherEdit);
    const newTeacherEdit = {
        id,
        ...req.body
    }
    teachers.splice(teacherEditIndex, 1, newTeacherEdit);
    res.status(200).json(teachers);
});

router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);
    const teacherEdit = teachers.find(teacher => teacher.id === id);
    const teacherEditIndex = teachers.indexOf(teacherEdit);
    const newTeacherEdit = {
        id,
        ...teacherEdit,
        ...req.body
    }
    teachers.splice(teacherEditIndex, 1, newTeacherEdit);
    res.status(200).json(teachers)
})

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const teacherDelete = teachers.find(teacher => teacher.id === id);
    const teacherDeleteIndex = teachers.indexOf(teacherDelete);
    teachers.splice(teacherDeleteIndex, 1);
    res.status(200).json(teachers);
})

export default router;
