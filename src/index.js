const express = require("express");
require("./db/mongoose");

const User = require("./models/user");
const Tasks = require("./models/tasks");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//C for create
app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => res.status(201).send(user))
    .catch((e) => {
      res.status(400).send(e);
    });
});

//R for read two methods per Model
app.get("/users", (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((e) => {
      res.status(500).send();
    });
});
//grab the dynamic value per unique request /:customvariable
app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }

      res.send(user);
    })
    .catch((error) => {
      res.status(500).send();
    });
});

app.post("/tasks", (req, res) => {
  const tasks = new Tasks(req.body);
  tasks
    .save()
    .then(() => res.status(201).send(tasks))
    .catch((e) => res.status(400).send(e));
});

app.get("/tasks", (req, res) => {
  Tasks.find({})
    .then((tasks) => res.send(tasks))
    .catch((error) => res.status(500).send());
});

app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Tasks.findById(_id)
    .then((task) => {
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    })
    .catch((e) => res.status(500).send());
});

app.listen(port, () => {
  console.log("Server is running on " + port);
});
