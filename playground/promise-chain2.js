require("../src/db/mongoose");
const Task = require("../src/models/tasks");

// Task.findByIdAndDelete("5f807f79040b4a4bd0b387f0")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((res) => console.log(res))
//   .catch((e) => console.log(e));

//   //delete task and count id as argument

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return {
    task,
    count,
  };
};

deleteTaskAndCount("5f809dc0889841546da490bb")
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
