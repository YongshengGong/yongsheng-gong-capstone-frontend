import "./Login.scss"
import close from "../../assets/icons/close.svg"
import { useNavigate } from "react-router-dom";
function Login({ popup, setPopup }) {
    const nav = useNavigate();
    function handleLogin() {

    }
    return (
        <section className={popup == true ? "login" : "login login--hidden"}>
            <section className="login__container">
                <img src={close} className="login__container-close" onClick={() => setPopup(false)} />
                <h1 className="login__container-title">Welcome to EMS</h1>
                <form className="login__container-form" onSubmit={handleLogin}>
                    <input className="login__container-form-input" type="text" placeholder="username" />
                    <input className="login__container-form-input" type="text" placeholder="password" />
                    <section className="login__container-form-buttons">
                        <button className="login__container-form-buttons--1" onClick={() => setPopup(false)} type="button">Log In</button>
                        <button className="login__container-form-buttons--2" onClick={() => nav("/Register")}>Register as a company</button>
                        <button className="login__container-form-buttons--2" onClick={() => nav("/Apply")}>Apply to be a company member</button>
                    </section>
                </form>
            </section>
        </section>
    )
}
export default Login;