const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are disabled");
//   } else {
//     next();
//   }
// // });

// app.use((req, res, next) => {
//   if (req.method) {
//     res.status(503).send("Network down due to updates on the system");
//   } else {
//     next();
//   }
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is running on " + port);
});

// const Task = require("./models/tasks");
// const User = require("./models/user");
// const main = async () => {
//   // const task = await Task.findById("5f84a817d9d64967a33ba574");
//   // await task.populate("owner").execPopulate();
//   // console.log(task);

//   const user = await User.findById("5f84a809d9d64967a33ba572");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };

// main();
