import React from "react";
import "./App.css";

import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";

function EditScreen() {
  let { id } = useParams();
  let history = useHistory();

  const [name, setName] = React.useState("");
  const [completed, setCompleted] = React.useState(false);

  const [showDeleteModal, setShowEditModal] = React.useState(false);

  const handleClose = () => setShowEditModal(false);
  const handleShow = () => setShowEditModal(true);

  const handleDeleteModal = async (e) => {
    e.preventDefault();
    handleShow();

    await axios.delete(`/api/todos/delete/${id}`);
    history.push("/");
    handleClose();
  };

  React.useEffect(() => {
    async function fetchData() {
      const { data } = await axios.post(`/api/todos`);

      const existsTodo = data.data.find((todo) => {
        return todo._id == id;
      });

      if (existsTodo) {
        setName(existsTodo.name);
        setCompleted(existsTodo.completed);
      } else {
        history.push("/");
      }
    }

    fetchData();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    // name, completed
    await axios.put(`/api/todos/edit/${id}`, {
      name,
      completed,
    });
    history.push("/");
  };

  const handleCompleted = async (e) => {
    e.preventDefault();
    setCompleted(!completed);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/todos/delete/${id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h2 className="text-center pt-5">Edit</h2>
          <p className="text-center text-secondary">
            A simple MERN (Mongo, Express, ReactJS, NodeJS) Todo-List App
          </p>
          <div className="d-flex">
            <input
              type="text"
              className="form form-control"
              placeholder="Edit todo..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="btn btn-outline-primary" onClick={handleEdit}>
              Edit
            </button>
            <button
              className="btn btn-outline-secondary d-flex justify-content-center align-items-center"
              onClick={handleCompleted}
            >
              Completed
              {completed && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                </svg>
              )}
            </button>
            <button className="btn btn-outline-danger" onClick={handleShow}>
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteModal}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditScreen;
