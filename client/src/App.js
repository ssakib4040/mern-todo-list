import React from "react";
import "./App.css";

import axios from "axios";

import Todo from "./Todo";

function App() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [todoName, setTodoName] = React.useState("");

  const [todosFilterName, setTodosFilterName] = React.useState("all");
  const [todosFilterList, setTodosFilterList] = React.useState([]);

  React.useEffect(() => {
    async function getTodos() {
      try {
        const { data } = await axios.post("/api/todos");

        setTodos(data.data);
        setTodosFilterList(data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    getTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (todoName) {
      try {
        const { data } = await axios.post(`/api/todos/create`, {
          name: todoName,
        });

        const newTodo = todos.slice();

        newTodo.unshift(data.data);

        setTodos(newTodo);
        setTodosFilterList(newTodo);

        setTodoName("");
      } catch (error) {
        window.alert("Something went wrong, please try again later");
      }
    }
  };

  const handleFilter = (e) => {
    setTodosFilterName(e);
    switch (e) {
      case "all":
        const allTodo = todos;
        setTodosFilterList(allTodo);
        break;
      case "active":
        const activeTodo = todos.filter((todo) => todo.completed == false);
        setTodosFilterList(activeTodo);
        break;
      case "completed":
        const completedTodo = todos.filter((todo) => todo.completed == true);
        setTodosFilterList(completedTodo);
        break;
      default:
        break;
    }
  };

  const deleteTodo = (todoId) => {
    const data = todos.filter((todo) => todo._id != todoId);

    setTodos(data);
    setTodosFilterList(data);
  };

  const toggleCompleted = async (id) => {
    const toggledTodo = todos.slice().find((x) => x._id == id);
    // console.log(toggledTodo.completed);
    try {
      axios.put(`/api/todos/edit/${id}`, {
        completed: !toggledTodo.completed,
      });

      const newTodo = todos.slice();

      newTodo.map((todo, index) => {
        if (todo._id == id) {
          newTodo[index] = { ...todo, completed: !newTodo[index].completed };
        }
        return todo;
      });

      setTodos(newTodo);
      setTodosFilterList(newTodo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h2 className="text-center pt-5">A simple laravel Todo</h2>
          <p className="text-center text-secondary">
            A simple MERN (Mongo, Express, ReactJS, NodeJS) Todo-List App
          </p>
          <form onSubmit={handleSubmit} method="get" className="d-flex">
            <input
              type="text"
              className="form form-control"
              placeholder="Add new..."
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
            />
            <button className="btn btn-outline-primary" type="submit">
              Add
            </button>
          </form>
          <div className="btn-group mt-3">
            <a
              href="#"
              className={`btn btn-sm  btn-outline-primary ${
                todosFilterName == "all" && "active"
              }`}
              onClick={() => handleFilter("all")}
            >
              All
            </a>
            <a
              href="#"
              className={`btn btn-sm  btn-outline-primary ${
                todosFilterName == "active" && "active"
              }`}
              onClick={() => handleFilter("active")}
            >
              Active
            </a>
            <a
              href="#"
              className={`btn btn-sm  btn-outline-primary ${
                todosFilterName == "completed" && "active"
              }`}
              onClick={() => handleFilter("completed")}
            >
              Completed
            </a>
          </div>

          {loading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          ) : todos.length > 0 ? (
            todosFilterList.map((todo) => (
              <Todo
                key={todo._id}
                id={todo._id}
                name={todo.name}
                completed={todo.completed}
                deleteTodo={deleteTodo}
                toggleCompleted={toggleCompleted}
                // deleteClick={handleDelete}
              />
            ))
          ) : (
            <div className="alert alert-primary mt-3" role="alert">
              No todos found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
