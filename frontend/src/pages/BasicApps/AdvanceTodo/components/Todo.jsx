import { useId } from "react"
import { useModal } from "../../../../contexts/Modal/Provider"
import TodoForm from "./TodoForm"
import { useDispatch } from "react-redux"
import { toggleItemStatus } from "../../../../store/reducers/todo"
import toast from "react-hot-toast"

export default function Todo({ todo }) {
    const Modal = useModal()
    const id = useId()
    const dispatch = useDispatch()

    const changeHandler = e => {
        dispatch(toggleItemStatus({ id: todo.id, collectionId: todo.collectionId }))
    }

    return (
        <div className="todo">
            <input
                type="checkbox"
                id={`todo-${id}`}
                checked={todo.status}
                onChange={changeHandler}
            />

            <label htmlFor={`todo-${id}`}>{todo.todo}</label>
            <span
                onClick={
                    _ => Modal.open(
                        <TodoForm collectionId={todo.collectionId} todo={todo} />
                    )
                }
            >
                <i className="fa-solid fa-magnifying-glass" />
            </span>
        </div >
    )
}
