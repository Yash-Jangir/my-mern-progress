import { Outlet } from "react-router";
import SideBar from "./SideBar";

export default function AppLayout() {
    return (
        <section>
            <SideBar />
            <Outlet />
        </section>
    )
}