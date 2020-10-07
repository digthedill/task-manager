const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

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
