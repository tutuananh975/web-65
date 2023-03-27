import { objServerWrong } from '../models/serverWrong.js';
import StudentModel from '../models/Student.js';

class StudentController {
    getAllStudents(req, res) {
        StudentModel.find({})
            .then(data => res.status(200).json({
                message: "get all Student successfully!!!",
                data
            }))
            .catch(err => {
                console.log(err);
                res.status(500).json(objServerWrong);
            })
    }

    getStudentBySlug(req, res) {
        const slug = req.params.slug
        StudentModel.findOne()
    }
}

export default new StudentController();