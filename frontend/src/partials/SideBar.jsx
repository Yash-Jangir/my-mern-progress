import { useId } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/Auth/Context"


function ListItem({ icon, title, link = "#", onclick = null, classes = "" }) {
    return (
        <li onClick={onclick}>
            <Link className={classes} to={link}>
                <span>{icon}</span>
                <p>{title}</p>
            </Link>
        </li>
    )
}

export default function SideBar() {
    const id = useId()
    const Auth = useAuth()

    const items = [
        [
            {
                title: "Home",
                link: "/",
                icon: <i className="fa-solid fa-house" style={{ fontSize: "1.2rem" }} />
            },
            {
                title: "Profile",
                link: "/profile",
                icon: <i className="fa-solid fa-user" style={{ fontSize: "1.2rem" }} />
            },
            {
                title: "Contact Me",
                link: "/contact-me",
                icon: <i className="fa-solid fa-envelope" style={{ fontSize: "1.2rem" }} />
            },
        ],
        [
            {
                title: "Delete Account",
                classes: "danger",
                icon: <i className="fa-solid fa-trash-can" style={{ fontSize: "1.2rem" }} />,
                onclick: async () => {
                    if (!confirm("Are you sure you want to delete your account?"))
                        return

                    toast.promise(
                        Auth.deleteAccount(),
                        {
                            loading: "Deleting account...",
                            success: resp => resp?.message,
                            error: err => err?.message,
                        }
                    )
                },
            },
            {
                title: "Logout",
                icon: <i className="fa-solid fa-right-from-bracket" style={{ fontSize: "1.2rem" }} />,
                onclick: async () => {
                    toast.promise(
                        Auth.logout(),
                        {
                            loading: "Logging out...",
                            success: resp => resp?.message,
                            error: err => err?.message,
                        }
                    )
                },
            },
        ]
    ]

    return (
        <aside>
            {
                items.map((item, i) => (
                    <ul key={`${id}-${i}`}>
                        {
                            item.map((item, i) => (
                                <ListItem key={`${id}-${item.title.toLowerCase().replace(" ", "-")}`} {...item} />
                            ))
                        }
                    </ul>
                ))
            }
        </aside>
    )
}
