import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div id="home" className="content">
            <h2>Home</h2>
            <div>
                <Link to={"/basic-apps/background-changer"}>
                    <div>
                        <span className="task-icon">
                            <i className="fa-solid fa-palette"></i>
                        </span>
                        Background-changing App
                    </div>
                    <span className="icon">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </span>
                </Link>
                <Link to={"/basic-apps/random-password-generator"}>
                    <div>
                        <span className="task-icon">
                            <i className="fa-solid fa-key"></i>
                        </span>
                        Random Password Generator App
                    </div>
                    <span className="icon">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </span>
                </Link>
                <Link to={"/basic-apps/currency-converter"}>
                    <div>
                        <span className="task-icon">
                            <i className="fa-solid fa-right-left"></i>
                        </span>
                        Currency Converter App
                    </div>
                    <span className="icon">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </span>
                </Link>
            </div>


            <h3>Redux Apps</h3>
            <div>
                <Link to={"/redux/tick-tac-toe"}>
                    <div>
                        <span className="task-icon">
                            <i className="fa-solid fa-gamepad"></i>
                        </span>
                        Tick Tac Toe Game
                    </div>
                    <span className="icon">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </span>
                </Link>
                <Link to={"/redux/todo-app"}>
                    <div>
                        <span className="task-icon">
                            <i className="fa-solid fa-table-list"></i>
                        </span>
                        Advance To-Do App
                    </div>
                    <span className="icon">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </span>
                </Link>
            </div>
        </div>
    )
}