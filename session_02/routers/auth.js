import express from "express";

const router = express.Router();

const users = [
  {
    id: 1,
    username: "tutuananh975",
    password: "12345678",
  },
  {
    id: 2,
    username: "tuminhanh2002",
    password: "12345678"
  }
]

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const isUser = users.some(user => (user.username === username && user.password === password));
  if(isUser) {
    res.status(200).send("Login success");
  } else {
    res.status(401).send("Invalid username or password");
  }
})

router.post("/register", (req, res) => {
  const isExistUser = users.some(user => user.username === req.body.username);
  if (isExistUser) {
    res.status(401).send("username is exist");
  } else {
    const newUser = {
      id: users[users.length - 1].id + 1,
      ...req.body
    }
    users.push(newUser);
    // res.status(200).send("register success!");
    res.json({
      message: "login success",
      allUser: users,
      newUser
    })
  }
})

export default router;
