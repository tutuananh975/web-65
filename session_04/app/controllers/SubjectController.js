import { objServerWrong } from '../models/serverWrong.js';
import SubjectModel from '../models/Subject.js';

class StudentController {
    getAllSubjects(req, res) {
        SubjectModel.find({})
            .then(data => res.status(200).json({
                message: "get all Subjects successfully!!!",
                data
            }))
            .catch(err => {
                console.log(err);
                res.status(500).json(objServerWrong);
            })
    }

    // getStudentBySlug(req, res) {
    //     const slug = req.params.slug
    //     StudentModel.findOne()
    // }
}

export default new StudentController();