
export default function NoFriends({ text = "No friends yet!" }) {
    return (
        <div className="friend">
            <div className="name" style={{ textAlign: "center" }}>{text}</div>
        </div>
    )
}