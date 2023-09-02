import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase.config";
import EditTodo from "./EditTodo";

const Todo = () => {
  const collectionRef = collection(db, "todo");
  const [createTodo, setCreateTodo] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // ATodo Handler
  const submitTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collectionRef, {
        todo: createTodo,
        isChecked: false,
        timestamp: serverTimestamp(),
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
  };

  const handleAddModalShow = () => {
    setShowAddModal(true);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Button
                  onClick={handleAddModalShow}
                  variant="info"
                  className="mb-3"
                >
                  Add Todo
                </Button>

                <div className="todo-list">
                  <div className="todo-item">
                    <hr />
                    <span>
                      <div className="checker">
                        <span className="">
                          <input type="checkbox" />
                        </span>
                      </div>
                      &nbsp; Go hard or Go Home
                      <br />
                      <i>10/11/2022</i>
                    </span>
                    <span className="float-end mx-3">
                      <EditTodo />
                    </span>
                    <Button variant="danger" className="float-end">
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showAddModal} onHide={handleAddModalClose}>
        <Form onSubmit={submitTodo}>
          <Modal.Header closeButton>
            <Modal.Title>Add Todo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type="text"
              placeholder="Add a Todo"
              onChange={(e) => setCreateTodo(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddModalClose}>
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

export default Todo;
