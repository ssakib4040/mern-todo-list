const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    name: String,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
