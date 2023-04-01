import FilmModel from '../models/Film.js';
import { objServerWrong } from '../models/objServerWrong.js';

class DataController {
    async show(req, res ) {
        const role = req.role;
        try {
            let data
            if(role) {
                data = await FilmModel.find({});
            } else {
                data = await FilmModel.find({isFree: true})   
            }
            res.status(200).json({
                status: "ok",
                message: "get ALl Films successfully!",
                data
            })
        } catch(err) {
            console.log(err);
            res.status(500).json(objServerWrong);
        }

    }

    async insert(req, res) {
        try {
            const foundFilm = await FilmModel.findOne({name: req.body.name})
            if(foundFilm) {
                return res.status(400).json({
                    status: "failure",
                    message: "film name already exists",
                    data: ""
                })
            }
            const newFilm = new FilmModel({...req.body});
            newFilm.save();
            return res.status(201).json({
                status: "ok",
                message: "insert film successfully",
                data: newFilm
            })
        } catch(err) {
            console.log(err);
            res.status(500).json(objServerWrong);
        }
    }

    async edit(req, res) {
        const name = req.params.name;
        const { name: newName, isFree } = req.body;
        try {
            const foundFilm = await FilmModel.findOne({name});
            if(foundFilm) {
                foundFilm.isFree = isFree;
                foundFilm.name = newName;
                foundFilm.save();
                return res.status(200).json({
                    status: "ok",
                    message: "update film successfully",
                    data: foundFilm
                })
            }
            res.status(400).json({
                status: "failure",
                message: "Cannot find film with name = " + name,
                data: ""
            })
        } catch(err) {
            console.log(err);
            res.status(500).json(objServerWrong);
        }
    }

    async delete(req, res) {
        const name = req.params.name;
        try {
            const foundFilm = await FilmModel.findOneAndDelete({name});
            if(!foundFilm) {
                return res.status(400).json({
                    status: "failure",
                    message: "Cannot find film with name = " + name,
                    data: ""
                })
            }
            res.status(200).json({
                status: "ok",
                message: "delete film successfully",
                data: foundFilm
            })
            
        } catch(err) {
            console.log(err);
            res.status(500).json(objServerWrong);
        }
    }
}

export default new DataController();