import { useModal } from "../../../../contexts/Modal/Provider";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import CollectionForm from "./CollectionForm";


export default function Collection({ collection }) {
    const Modal = useModal()

    return (
        <div className="collection">
            <div className="title">
                <h3>{collection.title}</h3>
                <div className="buttons">
                    <button className="primary" onClick={_ => Modal.open(<TodoForm collectionId={collection.id} />)} >
                        <i className="fa-solid fa-plus" />
                    </button>
                    <button className="save" onClick={_ => Modal.open(<CollectionForm collection={collection} />)} >
                        <i className="fa-solid fa-pen-to-square" />
                    </button>
                </div>
                <span style={{ background: collection?.color || "" }} ></span>
            </div>
            <div className="todos">
                {
                    collection.todoItems.map(
                        todoItem => <Todo key={todoItem.id} collectionId={collection.id} todo={todoItem} />
                    )
                }
            </div>
        </div>
    )
}