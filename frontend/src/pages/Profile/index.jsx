import { useAuth } from "../../contexts/Auth/Context"
import { useModal } from "../../contexts/Modal/Provider"
import EditForm from "./components/EditForm"
import EditPassword from "./components/EditPassword"
import EditAvatar from "./components/EditAvatar"


export default function Profile() {
    const Modal = useModal()
    const Auth = useAuth()
    const user = Auth.user

    return (
        <div id="profile" className="content">
            <div className="details">
                <div className="thumbnail">
                    {Auth.user.avatar && <img src={Auth.user.avatar} />}
                    <span
                        className="icon"
                        onClick={() => Modal.open(
                            <EditAvatar />
                        )}
                    >
                        <i className="fa-regular fa-pen-to-square" style={{ fontSize: "2rem" }}></i>
                    </span>
                </div>
                <div className="input-group">
                    <label>Full Name</label>
                    <div className="input">
                        {user?.fullName}
                        <span
                            className="icon"
                            onClick={() => Modal.open(
                                <EditForm
                                    name="fullName"
                                    label="Full Name"
                                />
                            )}
                        >
                            <i className="fa-regular fa-pen-to-square"></i>
                        </span>
                    </div>
                </div>
                <div className="input-group">
                    <label>Username</label>
                    <div className="input">
                        {user?.username}
                        <span
                            className="icon"
                            onClick={() => Modal.open(
                                <EditForm
                                    name="username"
                                    label="Username"
                                />
                            )}
                        >
                            <i className="fa-regular fa-pen-to-square"></i>
                        </span>
                    </div>
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <div className="input">
                        {user?.email}
                        <span
                            className="icon"
                            onClick={() => Modal.open(
                                <EditForm
                                    name="email"
                                    label="Email"
                                />
                            )}
                        >
                            <i className="fa-regular fa-pen-to-square"></i>
                        </span>
                    </div>
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <div className="input">
                        &nbsp;
                        <span
                            className="icon"
                            onClick={() => Modal.open(<EditPassword />)}
                        >
                            <i className="fa-regular fa-pen-to-square"></i>
                        </span>
                    </div>
                </div>
                <div className="input-group">
                    <label className="for-textarea">Description</label>
                    <div className="textarea" style={{ whiteSpace: "break-spaces", overflow: "hidden", width: "0%" }}>
                        {user?.description || ""}
                        <span
                            className="icon"
                            onClick={() => Modal.open(
                                <EditForm
                                    name="description"
                                    label="Description"
                                    isTextarea
                                />
                            )}
                        >
                            <i className="fa-regular fa-pen-to-square"></i>
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
}