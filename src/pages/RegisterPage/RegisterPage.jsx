import { InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Alert, notification } from 'antd';
import "./RegisterPage.scss"
import logo from "../../assets/logo.svg"
import visible from "../../assets/icons/visible.svg"
import notVisible from "../../assets/icons/notVisible.svg"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


function RegisterPage() {
    const [api, contextHolder] = notification.useNotification();
    const companyAlreadyExists = () => {
        api.info({
            message: "Error",
            description: <Alert message="This company already exists!" type="error" />,
            placement: "topRight",
            duration: 4,
            icon: <InfoCircleOutlined style={{ color: 'red' }} />
        });
    };
    const usernameAlreadyExists = () => {
        api.info({
            message: "Error",
            description: <Alert message="This username already exists!" type="error" />,
            placement: "topRight",
            duration: 4,
            icon: <InfoCircleOutlined style={{ color: 'red' }} />
        });
    };
    const emptyInput = () => {
        api.info({
            message: "Error",
            description: <Alert message="All form inputs have to be filled." type="error" />,
            placement: "topRight",
            duration: 4,
            icon: <InfoCircleOutlined style={{ color: 'red' }} />
        });
    };
    const success = () => {
        api.info({
            message: "Account created successfully",
            description: <Alert message="Leaving in 2 seconds..." type="success" />,
            placement: "topRight",
            duration: 4,
            icon: <CheckCircleOutlined style={{ color: 'green' }} />
        });
    };
    const nav = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const [companyName, setCompanyName] = useState({ company_name: "" });
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
    const [eyes, setEyes] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const allMembers = await axios.get(`${API_URL}/members`);
        const allCompanies = await axios.get(`${API_URL}/companies`);
        if (!companyName || !register.member_name || !register.username || !register.password) {
            emptyInput();
        }
        else if (allCompanies.data.find(company => company.company_name == companyName.company_name)) {
            companyAlreadyExists();
        }
        else if (allMembers.data.find(member => member.username == register.username)) {
            usernameAlreadyExists();
        }
        else {
            await axios.post(`${API_URL}/companies`, companyName);
            const res1 = await axios.get(`${API_URL}/companies`);
            const newlyAddedCompany = res1.data[res1.data.length - 1];
            await axios.post(`${API_URL}/teams`, {
                company_id: newlyAddedCompany.id,
                team_name: "Boss (Default)"
            });
            await axios.post(`${API_URL}/teams`, {
                company_id: newlyAddedCompany.id,
                team_name: "Managers (Default)"
            });
            await axios.post(`${API_URL}/teams`, {
                company_id: newlyAddedCompany.id,
                team_name: "Pending (Default)"
            });
            await axios.post(`${API_URL}/teams`, {
                company_id: newlyAddedCompany.id,
                team_name: "Applicants"
            });
            const res2 = await axios.get(`${API_URL}/teams`);
            const newlyAddedTeam = res2.data[res2.data.length - 4];
            await axios.post(`${API_URL}/members`, {
                company_id: newlyAddedTeam.company_id,
                team_id: newlyAddedTeam.id,
                ...register
            });
            success();
            setIsDisabled(true);
            setTimeout(() => { nav("/"); setIsDisabled(false); }, 2000);
        }
    }

    return (
        <div className="register">
            <main className="register__main">
                <img className="register__main-logo" src={logo} alt="the logo of EMS" onClick={() => { nav("/") }} />
                <h1 className="register__main-title">Register as a company</h1>
                <form className="register__main-form" onSubmit={handleSubmit}>
                    <input className="register__main-form-input" type="text" placeholder="Company name" onChange={e => setCompanyName({ ...companyName, company_name: e.target.value })} value={companyName.company_name} />
                    <input className="register__main-form-input" type="text" placeholder="Your name" onChange={e => setRegister({ ...register, member_name: e.target.value })} value={register.member_name} />
                    <input className="register__main-form-input" type="text" placeholder="Username" onChange={e => setRegister({ ...register, username: e.target.value })} value={register.username} />
                    <div className='register__main-form-password'>
                        <input className="register__main-form-input" type={eyes == false ? "password" : "text"} placeholder="Password" onChange={e => setRegister({ ...register, password: e.target.value })} value={register.password} />
                        <img src={eyes == false ? notVisible : visible} alt="" onClick={() => setEyes(!eyes)} />
                    </div>
                    <section className="register__main-form-buttons">
                        <button className="register__main-form-buttons--1" type="submit" disabled={isDisabled}>{isDisabled ? 'Please wait...' : 'Register now'}</button>
                    </section>
                </form>
            </main>
            {contextHolder}
        </div>
    )
}
export default RegisterPage;