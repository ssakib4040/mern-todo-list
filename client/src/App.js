import React from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = React.useState(null);
  const [todosFilter, setTodosFilter] = React.useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Click");
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
            />
            <button className="btn btn-outline-primary" type="submit">
              Add
            </button>
          </form>

          <div className="btn-group mt-3">
            <a href="#" className="btn btn-sm  btn-outline-primary active">
              All
            </a>
            <a href="#" className="btn  btn-sm btn-outline-primary">
              Active
            </a>
            <a href="#" className="btn btn-sm  btn-outline-primary">
              Completed
            </a>
          </div>

          <div className="shadow-sm p-3 bg-body rounded mt-3 border d-flex">
            <div className="w-100">
              <p className="text-decoration-line-through todo__text">
                I have to do my homework
              </p>
              <button className="btn btn-sm btn-outline-primary">Edit</button>
              <button className="btn btn-sm btn-outline-danger  m-1">
                Delete
              </button>
            </div>

            <div className="mx-2">
              <input type="checkbox" />
            </div>
          </div>

          <div className="shadow-sm p-3 bg-body rounded mt-3 border d-flex">
            <div className="w-100">
              <p>I have to do my homework</p>
              <button className="btn btn-sm btn-outline-primary">Edit</button>
              <button className="btn btn-sm btn-outline-danger">Delete</button>
            </div>

            <div className="mx-2">
              <input type="checkbox" />
            </div>
          </div>

          <div className="shadow-sm p-3 bg-body rounded mt-3 border d-flex">
            <div className="w-100">
              <p>I have to do my homework</p>
              <button className="btn btn-sm btn-outline-primary">Edit</button>
              <button className="btn btn-sm btn-outline-danger">Delete</button>
            </div>

            <div className="mx-2">
              <input type="checkbox" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
