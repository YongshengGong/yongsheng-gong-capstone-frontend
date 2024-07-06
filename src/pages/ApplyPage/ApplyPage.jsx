import { InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Alert, notification } from 'antd';
import "./ApplyPage.scss"
import logo from "../../assets/logo.svg"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

function ApplyPage() {
    const [api, contextHolder] = notification.useNotification();
    const companyDoesntExist = () => {
        api.info({
            message: "Error",
            description: <Alert message="This company doesn't exist!" type="error" />,
            placement: "topRight",
            duration: 3,
            icon: <InfoCircleOutlined style={{ color: 'red' }} />
        });
    };
    const emptyInput = () => {
        api.info({
            message: "Error",
            description: <Alert message="All form inputs have to be filled." type="error" />,
            placement: "topRight",
            duration: 3,
            icon: <InfoCircleOutlined style={{ color: 'red' }} />
        });
    };
    const success = () => {
        api.info({
            message: "Account created successfully",
            description: <Alert message="Leaving in 2 seconds..." type="success" />,
            placement: "topRight",
            duration: 3,
            icon: <CheckCircleOutlined style={{ color: 'green' }} />
        });
    };
    const nav = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const [companyName, setCompanyName] = useState({ company_name: "" });
    const [applicant, setApplicant] = useState(
        {
            username: uuidv4(),
            password: uuidv4(),
            member_name: "",
            member_title: "",
            member_email: "",
            member_phone: "",
            member_address: "",
            isTeamLeadOrNot: false
        }
    )
    const [showDropdown, setShowDropdown] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [allCompanies, setAllCompanies] = useState([]);
    useEffect(() => {
        const fetchCompanies = async () => {
            const res = await axios.get(`${API_URL}/companies`);
            setAllCompanies(res.data);
            setCompanies(res.data);
        };
        fetchCompanies();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const searchedCompany = allCompanies.find(company => company.company_name == companyName.company_name);
        if (!companyName.company_name || !applicant.member_name || !applicant.member_email || !applicant.member_phone || !applicant.member_address) {
            emptyInput();
        }
        else if (!searchedCompany) {
            companyDoesntExist();
        }
        else {
            const res1 = await axios.get(`${API_URL}/teams`);
            const filteredTeam = res1.data.find(team => team.team_name == "Applicants" && team.company_id == searchedCompany.id);
            await axios.post(`${API_URL}/members`, {
                company_id: searchedCompany.id,
                team_id: filteredTeam.id,
                ...applicant
            });
            success();
            setTimeout(() => { nav("/") }, 2000);
        }
    }
    const handleSearch = (e) => {
        setCompanyName({ ...companyName, company_name: e.target.value });
        if (e.target.value) {
            const filteredCompanies = allCompanies.filter(company =>
                company.company_name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setCompanies(filteredCompanies);
        } else {
            setCompanies(allCompanies);
        }
    }
    const handleFocus = async () => {
        setShowDropdown(true);
    }
    const handleOptionClick = (name) => {
        setCompanyName({ ...companyName, company_name: name });
        setShowDropdown(false);
    }
    return (
        <div className="apply" onClick={() => setShowDropdown(false)}>
            {contextHolder}
            <main className="apply__main">
                <img className="register__main-logo" src={logo} alt="the logo of EMS" onClick={() => { nav("/") }} />
                <h1 className="apply__main-title">Apply to be a company member</h1>
                <form className="apply__main-form" onSubmit={handleSubmit}>
                    <input className="apply__main-form-input" type="text" placeholder="search for a company" onChange={e => { handleSearch(e) }} onFocus={handleFocus} onClick={e => { e.stopPropagation() }} value={companyName.company_name} />
                    <section className={showDropdown ? "apply__main-form-dropdown" : "apply__main-form-dropdown apply__main-form-dropdown--hide"}>
                        {
                            showDropdown && companies.length > 0 ? (
                                <ul>
                                    {
                                        companies.map(company => {
                                            return (<li key={company.id} onClick={() => handleOptionClick(company.company_name)}>
                                                {company.company_name}
                                            </li>)
                                        })
                                    }
                                </ul>
                            ) : null
                        }
                    </section>
                    <input className="apply__main-form-input" type="text" placeholder="name" onChange={e => setApplicant({ ...applicant, member_name: e.target.value })} value={applicant.member_name} />
                    <input className="apply__main-form-input" type="text" placeholder="email" onChange={e => setApplicant({ ...applicant, member_email: e.target.value })} value={applicant.member_email} />
                    <input className="apply__main-form-input" type="text" placeholder="phone" onChange={e => setApplicant({ ...applicant, member_phone: e.target.value })} value={applicant.member_phone} />
                    <input className="apply__main-form-input" type="text" placeholder="address" onChange={e => setApplicant({ ...applicant, member_address: e.target.value })} value={applicant.member_address} />
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