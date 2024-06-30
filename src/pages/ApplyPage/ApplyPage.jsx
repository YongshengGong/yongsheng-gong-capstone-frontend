import "./ApplyPage.scss"
import logo from "../../assets/logo.svg"
import { useNavigate } from "react-router-dom";

function ApplyPage() {
    const nav=useNavigate();
    return (
        <div className="apply">
            <main className="apply__main">
            <img className="register__main-logo" src={logo} alt="the logo of EMS" onClick={() => { nav("/") }} />
                <h1 className="apply__main-title">Apply to be a company member</h1>
                <form className="apply__main-form">
                    <input className="apply__main-form-input" type="text" placeholder="search for a company" />
                    <input className="apply__main-form-input" type="text" placeholder="name" />
                    <input className="apply__main-form-input" type="text" placeholder="email" />
                    <input className="apply__main-form-input" type="text" placeholder="phone" />
                    <input className="apply__main-form-input" type="text" placeholder="address" />
                    <section className="apply__main-form-buttons">
                        <button className="apply__main-form-buttons--1" type="button">Apply now</button>
                        {/* <button className="apply__main-form-buttons--2" onClick={()=>nav("/Register")}>Register</button> */}
                    </section>
                    <p>The company's manager will contact you once your application is approved.</p>
                </form>
            </main>
        </div>
    )
}
export default ApplyPage;