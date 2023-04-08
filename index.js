const express = require("express");
const entries = require("./phonebook");

const app = express();

app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello world </h1>");
});

app.get("/api/people", (req, res) => {
  res.send(entries);
});

const PORT = 5173;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
