import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import EditTodo from "./EditTodo";

const Todo = () => {
  return (
    <>
      <Container>
        <Row>
          <Col md-12>
            <Card>
              <Card.Body>
                <Button
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                  type="button"
                  className="btn btn-info"
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
                    <span className=" float-end mx-3">
                      <EditTodo />
                    </span>
                    <button type="button" className="btn btn-danger float-end">
                      Delete
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal */}
      <div
        className="modal fade"
        id="addModal"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <Form className="d-flex">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalLabel">
                  Add Todo
                </h5>
                <Button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></Button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a Todo"
                />
              </div>
              <div className="modal-footer">
                <Button className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </Button>

                <Button className="btn btn-primary">Create Todo</Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Todo;
