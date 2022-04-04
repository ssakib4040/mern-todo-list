const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  name: String,
  active: String,
  completed: String,
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
