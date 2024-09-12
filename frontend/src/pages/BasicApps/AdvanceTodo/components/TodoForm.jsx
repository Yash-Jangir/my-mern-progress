import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../../../contexts/Modal/Provider"
import { createTodoItem, deleteTodoItem, handleFormDataChange, setFormData, updateTodoItem } from "../../../../store/reducers/todo"
import { useEffect } from "react"
import toast from "react-hot-toast"

export default function TodoForm({ collectionId, todo }) {
    const heading = todo ? "Edit Todo" : "Add New Todo"
    const formData = useSelector(state => state.todo.formData)
    const errors = useSelector(state => state.todo.errors)
    const dispatch = useDispatch()
    const Modal = useModal()

    const submitHandler = (e) => {
        e.preventDefault()

        let toastId = toast.loading("Saving...")
        dispatch(todo ?
            updateTodoItem(formData)
            : createTodoItem(formData)
        ).then(({ payload }) => {
            toast.remove(toastId)
            if (!payload.status) {
                toast.error(payload?.message)
            } else {
                Modal.close()
                toast.success(payload?.message)
            }
        })
    }

    const deleteHandler = () => {
        if (!todo) return

        let toastId = toast.loading("Deleting...")
        dispatch(deleteTodoItem({ id: todo.id, collectionId: todo.collectionId }))
            .then(({ payload }) => {
                toast.remove(toastId)
                if (!payload.status) {
                    toast.error(payload?.message)
                } else {
                    Modal.close()
                    toast.success(payload?.message)
                }
            })
    }

    useEffect(() => {
        dispatch(setFormData(todo ?? { collectionId, todo: "", status: false }))
    }, [])

    return (
        <div className="todo-form">
            <h3>{heading}</h3>
            <form onSubmit={submitHandler}>
                <div className="details">
                    <div className="input-group">
                        <input
                            type="text"
                            name="todo"
                            placeholder="Add your todo"
                            className={errors?.todo && "invalid"}
                            value={formData?.todo || ""}
                            onChange={e => dispatch(handleFormDataChange({ key: "todo", value: e.target.value }))}
                        />
                    </div>

                    <div className="meta-details">
                        <div className="status">
                            <span>Status</span>
                            <div>
                                <label htmlFor="status">{formData?.status ? "Complete" : "Incomplete"}</label>
                                <input
                                    type="checkbox"
                                    name="description"
                                    id="status"
                                    value={"on"}
                                    checked={formData?.status ?? false}
                                    onChange={e => dispatch(handleFormDataChange({ key: "status", value: e.target.checked }))}
                                />
                            </div>
                        </div>

                        {
                            todo && <div>
                                <p>Created At: {new Date(todo.createdAt).toLocaleString("en-In")}</p>
                                <p>Updated At: {new Date(todo.updatedAt).toLocaleString("en-In")}</p>
                            </div>
                        }
                    </div>
                </div>

                <div className="buttons">
                    {
                        todo && <button className="cancel" type="button" onClick={deleteHandler}>Remove</button>
                    }
                    <button className="primary">
                        {todo ? "Update" : "Add"}
                    </button>
                </div>
            </form>
        </div>
    )
}