const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  description: {
    trim: true,
    required: true,
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
taskSchema.pre("save", async function (next) {
  const task = this;

  console.log(task, "before a save");

  next();
});

const Tasks = mongoose.model("Tasks", taskSchema);

module.exports = Tasks;
