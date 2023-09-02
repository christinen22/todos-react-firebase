import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase.config";

interface AddTodoProps {
  onTodoAdded: () => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onTodoAdded }) => {
  const collectionRef = collection(db, "todo");
  const [createTodo, setCreateTodo] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!createTodo.trim()) {
      return;
    }

    try {
      await addDoc(collectionRef, {
        todo: createTodo,
        isChecked: false,
        timestamp: serverTimestamp(),
      });

      // notify the parent component that a new todo has been added
      onTodoAdded();

      setShowAddModal(false);
      setCreateTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <>
      <Button
        onClick={() => setShowAddModal(true)}
        variant="info"
        className="mb-3"
      >
        Add Todo
      </Button>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Todo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type="text"
              placeholder="Add a Todo"
              value={createTodo}
              onChange={(e) => setCreateTodo(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Create Todo
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddTodo;
