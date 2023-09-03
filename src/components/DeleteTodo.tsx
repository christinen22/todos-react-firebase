import { Button } from "react-bootstrap";

interface DeleteTodoProps {
  todoId: string;
  onDelete: (todoId: string) => void;
}

const DeleteTodo: React.FC<DeleteTodoProps> = ({ todoId, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(todoId);
  };

  return (
    <div>
      <Button variant="danger" onClick={handleDeleteClick}>
        Delete
      </Button>
    </div>
  );
};

export default DeleteTodo;
