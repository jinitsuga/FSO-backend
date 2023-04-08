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

console.log();
app.get("/", (req, res) => {
  res.send("<h1>Hello world </h1>");
});

app.get("/api/people", (req, res) => {
  res.send(entries);
});

app.get("/info", (req, res) => {
  const numberOfEntries = entries.entries.length;
  const rightNow = new Date().toISOString().slice(0, 10);
  res.send(
    `The phonebook, as of ${rightNow}, holds info for ${numberOfEntries} people!`
  );
});

const PORT = 5173;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
