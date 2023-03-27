import { objServerWrong } from '../models/serverWrong.js';
import TeacherModel from '../models/Teacher.js';

class TeacherController {
    getAllTeachers(req, res) {
        TeacherModel.find({})
            .then(data => res.status(200).json({
                message: "get all Teachers successfully!!!",
                data
            }))
            .catch(err => {
                console.log(err);
                res.status(500).json(objServerWrong);
            })
    }

    // getStudentBySlug(req, res) {
    //     const slug = req.params.slug
    //     TeacherModel.findOne()
    // }
}

export default new TeacherController();