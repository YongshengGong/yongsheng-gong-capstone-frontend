import "./Header.scss"
import logo from "../../assets/logo.svg"
import Login from "../Login/Login";
import { useState } from "react";
function Header({ handleLogin }) {
    const [popup, setPopup] = useState(false);
    const loginPage = () => {
        setTimeout(() => { setPopup(true) }, 100);
    }
    return (
        <>
            <header className="header">
                <img className="header__logo" src={logo} alt="the logo of EMS" onClick={() => { nav("/") }} />
                <nav className="header__nav">
                    <ul className="header__nav-list">
                        <li className="header__nav-list-item" onClick={loginPage}>
                            LOGIN
                        </li>
                    </ul>
                </nav>
            </header>
            <Login popup={popup} setPopup={setPopup} handleLogin={handleLogin} />
        </>
    )
}
export default Header;