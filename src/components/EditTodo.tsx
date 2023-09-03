import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

interface EditTodoProps {
  todoId: string;
  onEdit: (todoId: string, updatedTodo: string) => void;
}

const EditTodo: React.FC<EditTodoProps> = ({ todoId, onEdit }) => {
  const [showModal, setShowModal] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState("");

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const updateTodo = () => {
    onEdit(todoId, updatedTodo);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Todo
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Todo Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="text"
              placeholder="Todo Details"
              value={updatedTodo}
              onChange={(e) => setUpdatedTodo(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateTodo}>
            Update Todo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTodo;
