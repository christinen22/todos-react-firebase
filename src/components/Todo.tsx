import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/firebase.config";
import EditTodo from "./EditTodo";
import { TodoItem } from "../types";
import AddTodo from "./AddTodo";
import DeleteTodo from "./DeleteTodo";
import CheckboxHandler from "./CheckboxHandler";

const Todo = () => {
  const collectionRef = collection(db, "todo");
  const [todos, setTodo] = useState<TodoItem[]>([]);

  const getTodo = async () => {
    try {
      const todos = await getDocs(collectionRef);
      const todoData: TodoItem[] = todos.docs.map((doc) => {
        const { isChecked, timestamp, todo } = doc.data();
        return { isChecked, timestamp, todo, id: doc.id };
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

  const handleDelete = async (todoId: string) => {
    try {
      console.log(todoId);
      const confirmation = window.confirm("Are you sure you want to delete?");
      if (confirmation && todoId) {
        const documentRef = doc(db, "todo", todoId);
        console.log(documentRef);
        await deleteDoc(documentRef);
        getTodo();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Define the updateTodo function
  const updateTodo = async (todoId: string, updatedTodo: string) => {
    try {
      // Construct a reference to the todo document
      const todoRef = doc(db, "todo", todoId);

      // Update the todo document with the new data
      await updateDoc(todoRef, {
        todo: updatedTodo,
      });

      // Refresh the todo list
      getTodo();
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const handleCheckboxChange = async (todoId: string, isChecked: boolean) => {
    try {
      // Implement your checkbox change logic here
      // For example, you can update the isChecked field in Firestore
      const documentRef = doc(db, "todo", todoId);
      await updateDoc(documentRef, { isChecked });
      getTodo(); // Refresh the todos list
    } catch (err) {
      console.log(err);
    }
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
                    <div
                      className={`todo-item ${
                        todo.isChecked ? "crossed-out" : ""
                      }`}
                    >
                      <hr />
                      <span>
                        <div className="checker">
                          <CheckboxHandler
                            isChecked={todo.isChecked}
                            onChange={(isChecked) =>
                              handleCheckboxChange(todo.id, isChecked)
                            }
                          />
                        </div>
                        &nbsp;{todo.todo}
                        <hr />
                        <i>10/11/2022</i>
                      </span>
                      <span className="float-end mx-3">
                        <EditTodo todoId={todo.id} onEdit={updateTodo} />
                      </span>
                      <DeleteTodo todoId={todo.id} onDelete={handleDelete} />
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
