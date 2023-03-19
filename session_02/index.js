// const express = require("express");
import express from "express";
import studentRouters from "./routers/students.js";
import teacherRouters from "./routers/teachers.js";
import authRouters from "./routers/auth.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/students", studentRouters);
app.use("/teachers", teacherRouters);
app.use("/auth", authRouters);

app.listen(8080, (err) => {
  console.log("Server is running");
});
