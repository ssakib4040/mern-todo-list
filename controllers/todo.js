const Todo = require("../models/Todo");

exports.getAllTodos = async (req, res) => {
  const todos = await Todo.find({}).sort({ createdAt: "desc" });

  try {
    res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      data: error.message,
    });
  }
};

exports.createTodo = async (req, res) => {
  const { name } = req.body;

  if (!name)
    return res
      .status(401)
      .json({ success: false, message: "Please provide a name" });

  const todo = {
    name,
    active: false,
    completed: false,
  };

  const data = await Todo.create(todo);

  res.status(201).json({
    success: true,
    message: "Created Successfully",
    data: data,
  });
};

exports.getTodoById = async (req, res) => {
  const { id: todoId } = req.params;

  try {
    const todo = await Todo.findOne({ _id: todoId });

    if (!todo)
      return res.status(400).json({
        success: false,
        message: "Todo not found",
      });

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: error.message,
    });
  }

  // try {
  //   res.status(200).json({
  //     success: true,
  //     data: todos,
  //   });
  // } catch (error) {
  //   res.status(200).json({
  //     success: true,
  //     data: error.message,
  //   });
  // }
};

exports.editTodoById = async (req, res) => {
  const { name, completed } = req.body;
  const { id: todoId } = req.params;

  try {
    const editData = await Todo.findByIdAndUpdate(todoId, {
      name: name,
      completed: completed ? completed : false,
    });

    if (!editData) {
      res.status(400).json({
        success: false,
        message: "Todo not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Edited successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteTodoById = async (req, res) => {
  const { id: todoId } = req.params;

  try {
    const data = await Todo.findOneAndDelete({ _id: todoId });

    if (!data) {
      return res.status(200).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: false,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
