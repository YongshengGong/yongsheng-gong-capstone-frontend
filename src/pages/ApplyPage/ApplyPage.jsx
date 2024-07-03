import "./ApplyPage.scss"
import logo from "../../assets/logo.svg"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

function ApplyPage() {
    const nav = useNavigate();
    const port = import.meta.env.VITE_PORT;
    const [companyName,setCompanyName]=useState({company_name:""});
    const [applicant, setApplicant] = useState(
        {
            username: "",
            password: uuidv4(),
            member_name: "",
            member_title: "",
            member_email: "",
            member_phone: "",
            member_address: "",
            isTeamLeadOrNot: false
        }
    )
    const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(`${port}/companies`);
    const searchedCompany=res.data.find(company=>company.company_name==companyName.company_name);
    const res1 = await axios.get(`${port}/teams`);
    const filteredTeam=res1.data.find(team=>team.team_name=="Applicants" && team.company_id==searchedCompany.id);
    await axios.post(`${port}/members`,{
        company_id:searchedCompany.id,
        team_id:filteredTeam.id,
        ...applicant
    });
    }
    return (
        <div className="apply">
            <main className="apply__main">
            <img className="register__main-logo" src={logo} alt="the logo of EMS" onClick={() => { nav("/") }} />
                <h1 className="apply__main-title">Apply to be a company member</h1>
                <form className="apply__main-form" onSubmit={handleSubmit}>
                    <input className="apply__main-form-input" type="text" placeholder="search for a company" onChange={e=>setCompanyName({...companyName,company_name:e.target.value})} value={companyName.company_name}/>
                    <input className="apply__main-form-input" type="text" placeholder="name" onChange={e=>setApplicant({...applicant,username:e.target.value,member_name:e.target.value})} value={applicant.member_name}/>
                    <input className="apply__main-form-input" type="text" placeholder="email" onChange={e=>setApplicant({...applicant,member_email:e.target.value})} value={applicant.member_email}/>
                    <input className="apply__main-form-input" type="text" placeholder="phone" onChange={e=>setApplicant({...applicant,member_phone:e.target.value})} value={applicant.member_phone}/>
                    <input className="apply__main-form-input" type="text" placeholder="address" onChange={e=>setApplicant({...applicant,member_address:e.target.value})} value={applicant.member_address}/>
                    <section className="apply__main-form-buttons">
                        <button className="apply__main-form-buttons--1" type="submit">Apply now</button>
                        {/* <button className="apply__main-form-buttons--2" onClick={()=>nav("/Register")}>Register</button> */}
                    </section>
                    <p>The company's manager will contact you once your application is approved.</p>
                </form>
            </main>
        </div>
    )
}
export default ApplyPage;