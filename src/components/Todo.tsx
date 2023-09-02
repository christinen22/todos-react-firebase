import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase.config";
import EditTodo from "./EditTodo";
import { TodoItem } from "../types";
import AddTodo from "./AddTodo";

const Todo = () => {
  const collectionRef = collection(db, "todo");
  const [todos, setTodo] = useState<TodoItem[]>([]);

  const getTodo = async () => {
    try {
      const todos = await getDocs(collectionRef);
      const todoData: TodoItem[] = todos.docs.map((doc) => {
        const { isChecked, timestamp, todo } = doc.data();
        return { isChecked, timestamp, todo };
      });
      setTodo(todoData);
      console.log(todoData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  const handleTodoAdded = () => {
    getTodo();
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <AddTodo onTodoAdded={handleTodoAdded} />

                {todos.map((todo, index) => (
                  <div className="todo-list" key={index}>
                    <div className="todo-item">
                      <hr />
                      <span>
                        <div className="checker">
                          <span className="">
                            <input type="checkbox" />
                          </span>
                        </div>
                        &nbsp;{todo.todo}
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
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Todo;
