const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./openapi.yaml"); // path to your spec file

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let taskList = [
  { id: 1, title: "First Task", done: true },
  { id: 2, title: "Second Task", done: false },
  { id: 3, title: "Problem", done: true },
];
const port = 3000;

app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks", "/health", "/api-docs"],
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/tasks", (req, res) => {
  res.json(taskList);
});

app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  const task = taskList.find((task) => task.id === id);
  if (!task) {
    return res.status(404).send(`Task ${id} Not Found`);
  }
  res.send(task);
});

app.post("/tasks", (req, res) => {
  const title = req.body.title;

  if (!title || title.trim() === "") {
    return res.status(404).send("Request timed out");
  }

  const ids = taskList.map((task) => task.id);

  let newId;
  if (taskList.length === 0) {
    newId = 1;
  } else {
    newId = Math.max(...ids) + 1;
  }
  const newTask = {
    id: newId,
    title: title,
    done: false,
  };

  taskList.push(newTask);

  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);

  const taskIndex = taskList.findIndex((task) => task.id === parsedId);
  if (taskIndex === -1) {
    return res.status(400).send("Task Index Not Found");
  }

  taskList[taskIndex] = { id: parsedId, ...req.body };

  res.status(200).send(`${taskList[taskIndex].id} added successfully`);
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);

  const taskIndex = taskList.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(400).send("Task Index not found");
  }

  taskList.splice(taskIndex, 1);
  res.status(200).send("Task deleted successfully");
});

app.listen(port, () => {
  console.log(`Makima is listening on ${port}`);
});
