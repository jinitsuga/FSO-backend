const express = require("express");
const entries = require("./phonebook");
const morgan = require("morgan");
const cors = require("cors");

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

morgan.token("postData", (req, res) => {
  if (req.method == "POST") {
    return JSON.stringify(req.body);
  }
});

const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  console.log("---");
};
const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "Unknown endpoint" });
};

let phonebook = entries.entries;

app.use(morgan("tiny"));
app.use(morgan(":method :url :status :postData"));
app.use(cors());

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
    `The phonebook, as of ${rightNow}, holds about for ${numberOfEntries} people!`
  );
});

app.get("/api/people/:id", (req, res) => {
  const entry = phonebook.find((person) => person.id == req.params.id);
  if (entry) {
    res.send(entry);
  } else {
    res.status(404).send("Person not found");
  }
});

app.delete("/api/people/:id", (req, res) => {
  if (req.params.id > phonebook.length) {
    res.status(404).send("Can't delete - person not found");
  } else {
    res.send(phonebook.filter((entry) => entry.id != req.params.id));
  }
});

app.post("/api/people", (req, res) => {
  const newPerson = req.body;
  newPerson.id = parseInt(Math.random() * 100000);
  if (!newPerson.name || !newPerson.number) {
    res.status(400).send("missing information, either name or number");
  }
  const repeatedEntry = phonebook.find((entry) => entry.name == newPerson.name);
  if (repeatedEntry) {
    res.status(409).send("Person already exists in phonebook");
  }
  phonebook.push(newPerson);
  console.log(phonebook);
  res.send(phonebook);
});

app.use(unknownEndpoint);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
module.exports = app;
