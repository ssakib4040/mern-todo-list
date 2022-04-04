const router = require("express").Router();

const {
  getAllTodos,
  createTodo,
  getTodoById,
  editTodoById,
  deleteTodoById,
} = require("../controllers/todo");

router.route("/todos").post(getAllTodos);
router.route("/todos/create").post(createTodo);
router.route("/todos/:id").post(getTodoById);
router.route("/todos/edit/:id").put(editTodoById);
router.route("/todos/delete/:id").delete(deleteTodoById);

module.exports = router;
