import ChatSection from "./ChatSection"
import FriendSection from "./FriendSection"

export default function ChatApp() {

    return (
        <div id="chat-app" className="content">
            <ChatSection />
            <FriendSection />
        </div>
    )
}