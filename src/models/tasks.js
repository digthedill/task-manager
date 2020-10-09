const mongoose = require("mongoose");

const Tasks = mongoose.model("Tasks", {
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

module.exports = Tasks;
