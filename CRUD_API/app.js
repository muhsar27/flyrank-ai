const express = require("express");
const path = require("path");
const app = express();
const taskList = [
  { id: 1, title: "First Task", done: true },
  { id: 2, title: "Second Task", done: false },
  { id: 3, title: "Problem", done: true },
];
const port = 3000;

const swagger = require("swagger-ui-express");

app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
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
  const newId = 0 
  if (taskList.length < 1){
    newId = 1 
  }
  newId = Math.max(...ids) + 1;

  const newTask = {
    id: newId,
    title: title,
    done: false,
  };

  taskList.push(newTask);

  res.send("POST REQUEST SENT");
});
app.listen(port, () => {
  console.log(`Makima is listening on ${port}`);
});
