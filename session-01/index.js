const fs = require("fs"); // import fs from 'fs'
const http = require("http");
const url = require("url");

// fs.readFile("./hello-1.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log("Loi roi");
//   } else {
//     console.log(data);
//   }
// });

// const data = fs.readFileSync("./hello-1.txt", "utf-8");
// console.log(data);

// fs.writeFile(
//   "./hello.txt",
//   "Hello 1",
//   {
//     flag: "a",
//   },
//   (err, data) => {
//     console.log("DOne");
//   }
// );

// fs.writeFileSync("./hello.txt", "Hello 2", {
//   flag: "a",
// });

// console.log(a);

// fs.writeFileSync("./data.js", "const a = 1; console.log(a)");
const serverListener = (req, res) => {
  const userId = req.url.split("/").pop();
  switch (req.url) {
    case "/": {
      const htmlData = fs.readFileSync("./index.html", "utf-8");
      res.end(htmlData);
      break;
    }
    case "/api/users": {
      const usersData = fs.readFileSync("./data.json", "utf-8");
      res.end(usersData);
      break;
    }
    case `/api/users/${userId}`: {
      const usersData = fs.readFileSync("./data.json", "utf-8");
      const parseUserData = JSON.parse(usersData);
      const user = parseUserData.data.find((u) => u.id === Number(userId));
      res.end(JSON.stringify(user));
      break;
    }
    default:
      break;
  }
};

const server = http.createServer(serverListener);

server.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
