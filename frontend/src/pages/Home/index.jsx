import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div id="home" className="content">
            <h2>Home</h2>
            <div>
                <Link to={"/basic-apps/background-changer"}>
                    Background-changing App
                    <span className="icon">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </span>
                </Link>
                <Link to={"/basic-apps/random-password-generator"}>
                    Random Password Generator App
                    <span className="icon">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </span>
                </Link>
                <Link to={"/basic-apps/currency-converter"}>
                    Currency Converter App
                    <span className="icon">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </span>
                </Link>
            </div>


            <h3>Redux Apps</h3>
            <div>
                <Link to={"/redux/tick-tac-toe"}>
                    Tick Tac Toe Game
                    <span className="icon">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </span>
                </Link>
                <Link to={"/redux/todo-app"}>
                    Advance To-Do App
                    <span className="icon">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </span>
                </Link>
            </div>
        </div>
    )
}