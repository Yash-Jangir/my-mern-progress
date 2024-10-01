import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AppLayout from "../partials/AppLayout";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import NotFound404 from "../pages/Errors/NotFound404";
import BackgroundChanger from "../pages/BasicApps/BackgroundChanger";
import RandomPasswordGenerator from "../pages/BasicApps/RandomPasswordGenerator";
import CurrencyConvertorApp from "../pages/BasicApps/CurrencyConvertorApp";
import TickTacToe from "../pages/BasicApps/TickTacToe";
import AdvanceTodo from "../pages/BasicApps/AdvanceTodo";
import ContactMe from "../pages/ContactMe";
import ChatApp from "../pages/BasicApps/ChatApp";


const AppRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />} >
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact-me" element={<ContactMe />} />
            <Route path="/basic-apps" >
                <Route path="background-changer" element={<BackgroundChanger />} />
                <Route path="random-password-generator" element={<RandomPasswordGenerator />} />
                <Route path="currency-converter" element={<CurrencyConvertorApp />} />
                <Route path="tick-tac-toe" element={<TickTacToe />} />
            </Route>
            <Route path="/redux" >
                <Route path="tick-tac-toe" element={<TickTacToe />} />
                <Route path="todo-app" element={<AdvanceTodo />} />
                <Route path="chat-app" element={<ChatApp />} />
            </Route>

            <Route path="*" element={<NotFound404 />} />
        </Route>
    )
)


export default AppRouter
