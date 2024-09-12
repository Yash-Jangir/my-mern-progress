import { useDispatch, useSelector } from "react-redux"
import { createCollection, deleteCollection, getAllCollections, handleFormDataChange, setFormData, updateCollection } from "../../../../store/reducers/todo"
import toast from "react-hot-toast"
import { useModal } from "../../../../contexts/Modal/Provider"
import { useEffect } from "react"

export default function CollectionForm({ collection }) {
    const heading = collection ? "Edit Collection" : "Add New Collection"
    const formData = useSelector(state => state.todo.formData)
    const errors = useSelector(state => state.todo.errors)
    const dispatch = useDispatch()
    const Modal = useModal()

    const submitHandler = (e) => {
        e.preventDefault()

        let toastId = toast.loading("Saving...")
        dispatch(collection ?
            updateCollection({ ...formData, id: collection.id })
            : createCollection(formData)
        ).then(({ payload }) => {
            toast.remove(toastId)
            if (!payload.status) {
                toast.error(payload?.message)
            } else {
                Modal.close()
                dispatch(getAllCollections())
                toast.success(payload?.message)
            }
        })
    }

    const deleteHandler = () => {
        if (!collection) return

        let toastId = toast.loading("Deleting...")
        dispatch(deleteCollection({ id: collection.id }))
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
        dispatch(setFormData(collection || { title: "", color: "#000000" }))
    }, [])

    return (
        <div className="collection-form">
            <h3>{heading}</h3>
            <form onSubmit={submitHandler}>
                <div className="input-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        className={errors?.title && "invalid"}
                        value={formData?.title || ""}
                        onChange={e => dispatch(handleFormDataChange({ key: "title", value: e.target.value }))}
                    />
                </div>
                <div className="input-group">
                    <label>Color</label>
                    <input
                        type="color"
                        name="color"
                        className=""
                        value={formData?.color || ""}
                        onChange={e => dispatch(handleFormDataChange({ key: "color", value: e.target.value }))}
                    />
                </div>

                {
                    collection && <div className="meta">
                        <p>Created At: {new Date(collection.createdAt).toLocaleString("en-In")}</p>
                        <p>Updated At: {new Date(collection.updatedAt).toLocaleString("en-In")}</p>
                    </div>
                }


                <div className="buttons">
                    {
                        collection &&
                        <button
                            className="cancel"
                            type="button"
                            onClick={deleteHandler}
                        >Delete</button>
                    }
                    <button className="primary">
                        {collection ? "Update" : "Create"}
                    </button>
                </div>
            </form>
        </div>
    )
}
