import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
const todoRouter = express.Router();
const TODO_RESOURCE_PATH = path.join("resources", "todoResource.json");

todoRouter.get("/", (req,res) => {
    try {
        const fileData = fs.readFileSync(TODO_RESOURCE_PATH, "utf-8");

        const dataJSON = JSON.parse(fileData);
        res.status(200).json({
            message: "read success",
            data: dataJSON
        })
    } catch {
        res.status(500).json({
            message: "read failed",
            data: ""
        })
    }
    
})

todoRouter.get("/:todoId", (req, res) => {

})

todoRouter.post("/", (req, res) => {
    try {
        const {title, isCompleted} = req.body;
        const fileData = fs.readFileSync(TODO_RESOURCE_PATH, "utf-8");

        const dataJSON = JSON.parse(fileData);
        console.log(dataJSON, title, isCompleted);
        const newTodo = {
            id: uuidv4(),
            title,
            isCompleted
        }
        dataJSON.push(newTodo)
        fs.writeFileSync(TODO_RESOURCE_PATH, JSON.stringify(dataJSON));
        res.status(201).json({
            message: "create successfully!!!",
            data: dataJSON
        });
    } catch {   
        res.status(500).json({
            message: "create failed",
            data: ""
        })
    }
})

todoRouter.put("/:todoId", (req, res) => {

})

todoRouter.delete("/:todoId", (req, res) => {

})

export default todoRouter;