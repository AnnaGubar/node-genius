const express = require("express");
const bodyParse = require("body-parser");
const app = express();
const port = 3000;
const sqlite3 = require("sqlite3").verbose();
const dbName = "tasks.db";
const db = new sqlite3.Database(dbName);

let tasks = [
  {
    id: 1,
    text: "bkq tw",
  },
  {
    id: 2,
    text: " tsrhe h ewh e",
  },
  {
    id: 3,
    text: "fffffbkq rthw",
  },
  {
    id: 4,
    text: "wc4jweeeeeeeeeeeeeeeh",
  },
  {
    id: 5,
    text: "hwwwww qhq",
  },
];

const serverError = (err, rows) => {
  if (err) {
    return res.status(500).json({ error: err.message });
  }
};

const checkExist = (task, res) => {
  if (!task) {
    return res.status(404).json({ message: "Task is not found" });
  }
};

app.use(bodyParse.json());

app.get("/", (req, res) => {
  return res.send("Hello");
});

app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", (err, rows) => {
    serverError(err, res);

    return res.status(200).json(rows);
  });

  // return res.status(200).json(tasks);
});

app.post("/tasks", (req, res) => {
  const newTask = req.body;

  // tasks.push(newTask);

  db.run("INSERT INTO tasks (text) VALUES (?)", [newTask.text], (err) => {
    serverError(err, res);

    return res.status(201).json({ id: this.lastID });
  });
});

app.put("/tasks/:id", (req, res) => {
  const { text } = req.body;
  const taskId = parseInt(req.params.id);

  db.run("UPDATE tasks SET text = ? WHERE id = ?", [text, taskId], (err) => {
    serverError(err, res);
    return res.status(200).json({ id: taskId, text });
  });

  // const foundTask = tasks.find((task) => task.id === taskId);

  // if (!foundTask) {
  //   return res.status(404).json({ message: "Did not find searched task" });
  // }

  // foundTask.text = updatedTask.text;
});

app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  db.get("SELECT * FROM tasks SET WHERE id = ?", taskId, (err, row) => {
    serverError(err, res);
    checkExist(row, res);

    return res.status(200).json(row);
  });

  // const foundTask = tasks.find((task) => task.id === taskId);

  // if (!foundTask) {
  //   return res.status(404).json({ message: "Did not find searched task" });
  // }

  // foundTask.text = updatedTask.text;
});

app.delete("/tasks/:id", (req, res) => {
  // const deleteTaskId = parseInt(req.params.id);
  // tasks = tasks.filter((task) => task.id !== deleteTaskId);
  // return res.status(204).json(tasks);

  const taskId = parseInt(req.params.id);

  db.run("DELETE from tasks WHERE id = ?", taskId, (err) => {
    serverError(err, res);

    return res.status(204).send();
  });
});

app.listen(port, () => {
  console.log(`Server's running on http://localhost:${port}`);
});
