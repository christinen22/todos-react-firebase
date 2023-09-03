import { Button } from "react-bootstrap";
import { GiTrashCan } from "react-icons/gi";

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
        <GiTrashCan />
      </Button>
    </div>
  );
};

export default DeleteTodo;
