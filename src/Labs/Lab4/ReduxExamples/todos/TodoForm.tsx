import { Button, FormControl, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <FormControl className="w-25" value={todo.title}
                onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))} />
            <div className="d-flex gap-2">
                <Button onClick={() => dispatch(updateTodo(todo))}
                    id="wd-update-todo-click" className="btn btn-warning"> Update </Button>
                <Button onClick={() =>  dispatch(addTodo(todo))}
                    id="wd-add-todo-click" className="btn btn-success"> Add </Button>
            </div>
        </ListGroup.Item>
    );
}