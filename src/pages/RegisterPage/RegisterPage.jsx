import "./RegisterPage.scss"
import logo from "../../assets/logo.svg"
import { useNavigate } from "react-router-dom";
import { useState} from "react";
import axios from "axios";


function RegisterPage() {
    const nav = useNavigate();
    const port = import.meta.env.VITE_API_URL;
    const [companyName,setCompanyName]=useState({company_name:""});
    const [register, setRegister] = useState(
        {
            username: "",
            password: "",
            member_name: "",
            member_title: "Boss",
            member_email: "",
            member_phone: "",
            member_address: "",
            isTeamLeadOrNot: false
        }
    )
    const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${port}/companies`,companyName);
    const res1 = await axios.get(`${port}/companies`);
    const newlyAddedCompany=res1.data[res1.data.length-1];
    await axios.post(`${port}/teams`,{
        company_id:newlyAddedCompany.id,
        team_name:"Boss (Default)"
    });
    await axios.post(`${port}/teams`,{
        company_id:newlyAddedCompany.id,
        team_name:"Managers (Default)"
    });
    await axios.post(`${port}/teams`,{
        company_id:newlyAddedCompany.id,
        team_name:"Pending (Default)"
    });
    await axios.post(`${port}/teams`,{
        company_id:newlyAddedCompany.id,
        team_name:"Applicants"
    });
    const res2 = await axios.get(`${port}/teams`);
    const newlyAddedTeam=res2.data[res2.data.length-4];
    await axios.post(`${port}/members`,{
        company_id:newlyAddedTeam.company_id,
        team_id:newlyAddedTeam.id,
        ...register
    });
    }
    return (
        <div className="register">
            <main className="register__main">
                <img className="register__main-logo" src={logo} alt="the logo of EMS" onClick={() => { nav("/") }} />
                <h1 className="register__main-title">Register as a company</h1>
                <form className="register__main-form" onSubmit={handleSubmit}>
                    <input className="register__main-form-input" type="text" placeholder="Company name" onChange={e=>setCompanyName({...companyName,company_name:e.target.value})} value={companyName.company_name} />
                    <input className="register__main-form-input" type="text" placeholder="Your name" onChange={e=>setRegister({...register,member_name:e.target.value})} value={register.member_name} />
                    <input className="register__main-form-input" type="text" placeholder="Username" onChange={e=>setRegister({...register,username:e.target.value})} value={register.username} />
                    <input className="register__main-form-input" type="text" placeholder="Password" onChange={e=>setRegister({...register,password:e.target.value})} value={register.password} />
                    <section className="register__main-form-buttons">
                        <button className="register__main-form-buttons--1" type="submit">Register now</button>
                    </section>
                </form>
            </main>
        </div>
    )
}
export default RegisterPage;