import FriendList from "./components/FriendList";
import SearchInput from "./components/SearchInput";

export default function FriendSection() {
    return (
        <div className="friends-section">
            <SearchInput />
            <FriendList />
        </div>
    )
}