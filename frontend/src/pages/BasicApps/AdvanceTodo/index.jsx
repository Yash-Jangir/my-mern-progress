import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../contexts/Modal/Provider";
import Collection from "./components/Collection";
import CollectionForm from "./components/CollectionForm";
import { useEffect } from "react";
import { getAllCollections } from "../../../store/reducers/todo";
import toast from "react-hot-toast";


export default function AdvanceTodo() {
    const Modal = useModal()
    const collections = useSelector(state => state.todo.collections)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCollections())
    }, [])

    const addCollection = () => {
        if (collections.length >= 4) {
            toast.error("You can't add more than 4 collections")
        } else {
            Modal.open(<CollectionForm />)
        }
    }

    return (
        <div id="advance-todo" className="content">
            <h2>
                <span>Advance Todo App</span>
                <button className="primary" onClick={addCollection}>
                    <i className="fa-solid fa-plus" />
                </button>
            </h2>
            <div className="main">
                {
                    collections.map(
                        collection => <Collection key={collection.id} collection={collection} />
                    )
                }
            </div>
        </div>
    )
}
