import React from "react";
import axios from "axios";

import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Todo(props) {
  const [showDeleteModal, setShowEditModal] = React.useState(false);

  const handleClose = () => setShowEditModal(false);
  const handleShow = () => setShowEditModal(true);

  const handleDeleteModal = async (e) => {
    handleShow();
    // console.log(props);

    await axios.delete(`/api/todos/delete/${props.id}`);

    props.deleteTodo(props.id);
    handleClose();
  };

  return (
    <>
      <div className="shadow-sm p-3 bg-body rounded mt-3 border d-flex">
        <div className="w-100">
          <p
            className={`${
              props.completed && "text-decoration-line-through"
            } todo__text`}
            onClick={() => props.toggleCompleted(props.id)}
          >
            {props.name}
          </p>
          <Link
            to={`/edit/${props.id}`}
            className="btn btn-sm btn-outline-primary"
          >
            Edit
          </Link>
          <button
            className="btn btn-sm btn-outline-danger  m-1"
            onClick={handleShow}
          >
            Delete
          </button>
        </div>
        <div className="mx-2">
          <input
            type="checkbox"
            // checked={`${props.completed === true ? true : false}`}
            checked={props.completed == true ? true : false}
            onChange={() => props.toggleCompleted(props.id)}
          />
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
    </>
  );
}

export default Todo;
