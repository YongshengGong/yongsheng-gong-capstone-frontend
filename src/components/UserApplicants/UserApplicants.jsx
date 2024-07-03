import "./UserApplicants.scss"
import { MenuOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import axios from "axios";
import { useState, useEffect } from "react";

function UserApplicants({ setHideNav, menu }) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const port = import.meta.env.VITE_PORT;
    const [teams, setTeams] = useState(null);
    const [members, setMembers] = useState(null);
    const [companies, setCompanies] = useState(null);
    const [spreadPersonalInfo, setSpreadPersonalInfo] = useState({});
    const [save, setSave] = useState({});
    const [email, setEmail] = useState({});

    useEffect(() => {
        const fetch = async () => {
            const allTeams = await axios.get(`${port}/teams`);
            setTeams(allTeams.data);
            const allMembers = await axios.get(`${port}/members`);
            setMembers(allMembers.data);
            const allCompanies = await axios.get(`${port}/companies`);
            setCompanies(allCompanies.data);
        }
        fetch();
    }, [menu]);
    if (!teams || !members) {
        return (<>loading...</>)
    }
    const { Search } = Input;
    // const onSearch = value => console.log(value);
    const handleChildClick = (event) => {
        event.stopPropagation();
    };
    const handleEdit = (member_name, member_id, company_id, team_id, username, password, title, email, phone, address, isTeamLeadOrNot, company_name) => {
        setSpreadPersonalInfo({ ...spreadPersonalInfo, [member_id]: true });
        setSave({
            ...save,
            [member_id]: {
                company_id: company_id,
                team_id: team_id,
                username: username,
                password: password,
                member_name: member_name,
                member_title: title,
                member_email: email,
                member_phone: phone,
                member_address: address,
                isTeamLeadOrNot: isTeamLeadOrNot
            }
        });
        setEmail({
            ...email,
            [member_id]: {
                subject: "Application Approved",
                body: `Congratulation ${member_name}!\n\nYour application has been approved and welcome to the team!\n\nHere's your username and password to log in to your account:\n-Username: ${username}\n-Password: ${password}\n\nBest Regards\n${company_name}`
            }
        });


    }

    const handleSave = (e, editedObject, id) => {
        e.preventDefault();
        const fetch = async () => {
            const res = await axios.put(`${port}/members/${id}`, editedObject);
            const allTeams = await axios.get(`${port}/teams`);
            setTeams(allTeams.data);
            const allMembers = await axios.get(`${port}/members`);
            setMembers(allMembers.data);
        }
        fetch();
    }

    const openEmailClient = (email1, subject1, body1) => {
        const recipient = email1;
        const subject = encodeURIComponent(subject1);
        const body = encodeURIComponent(body1);
        const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
        window.location.href = mailtoUrl;
    };

    return (
        <section className={menu === "applicants" ? "user__main-applicants" : "user__main-applicants user__main-applicants--hide"} onClick={() => setSpreadPersonalInfo(false)}>

            <MenuOutlined className="user__main-applicants-nav-home" onClick={() => setHideNav(false)} />

            <section className="user__main-applicants-displayTeams">
                {
                    teams.filter(team => team.team_name == "Applicants" && team.company_id == user.company_id).map(team => {
                        return (<article className="user__main-applicants-displayTeams-singleTeam" key={team.id}>
                            <span className="user__main-applicants-displayTeams-singleTeam-teamName">{team.team_name}</span>
                            <section className="user__main-applicants-displayTeams-singleTeam-teamMembers">
                                {
                                    members.filter(member => member.team_id == team.id).map((member) => {
                                        return (
                                            <form className="user__main-applicants-displayTeams-singleTeam-teamMembers-singleMember" key={member.id} onClick={handleChildClick} onSubmit={(e) => handleSave(e, save[member.id], member.id)}>
                                                <span className="user__main-applicants-displayTeams-singleTeam-teamMembers-singleMember-title" onClick={() => handleEdit(member.member_name, member.id, member.company_id, member.team_id, member.username, member.password, member.member_title, member.member_email, member.member_phone, member.member_address, member.isTeamLeadOrNot, companies.find(company => company.id == member.company_id).company_name)}>{member.member_name}</span>
                                                <section
                                                    className={`user__main-applicants-displayTeams-singleTeam-teamMembers-singleMember-info ${spreadPersonalInfo[member.id] ?
                                                        "user__main-applicants-displayTeams-singleTeam-teamMembers-singleMember-info--show" :
                                                        "user__main-applicants-displayTeams-singleTeam-teamMembers-singleMember-info"
                                                        }`}>
                                                    <span className="user__main-applicants-displayTeams-singleTeam-teamMembers-singleMember-info-memberName"><span>Name:</span><input type="text" value={save[member.id] ? save[member.id].member_name : ""} onChange={(e) => setSave({ ...save, [member.id]: { ...save[member.id], member_name: e.target.value } })} /></span>
                                                    <span className="user__main-applicants-displayTeams-singleTeam-teamMembers-singleMember-info-memberTitle"><span>Title:</span><input type="text" value={save[member.id] ? save[member.id].member_title : ""} onChange={(e) => setSave({ ...save, [member.id]: { ...save[member.id], member_title: e.target.value } })} /></span>
                                                    <span className="user__main-applicants-displayTeams-singleTeam-teamMembers-singleMember-info-memberEmail"><span>Email:</span><input type="text" value={save[member.id] ? save[member.id].member_email : ""} onChange={(e) => setSave({ ...save, [member.id]: { ...save[member.id], member_email: e.target.value } })} /></span>
                                                    <span className="user__main-applicants-displayTeams-singleTeam-teamMembers-singleMember-info-memberPhone"><span>Phone:</span><input type="text" value={save[member.id] ? save[member.id].member_phone : ""} onChange={(e) => setSave({ ...save, [member.id]: { ...save[member.id], member_phone: e.target.value } })} /></span>
                                                    <span className="user__main-applicants-displayTeams-singleTeam-teamMembers-singleMember-info-memberAddress"><span>Address:</span><input type="text" value={save[member.id] ? save[member.id].member_address : ""} onChange={(e) => setSave({ ...save, [member.id]: { ...save[member.id], member_address: e.target.value } })} /></span>
                                                    <span className="user__main-applicants-displayTeams-singleTeam-teamMembers-singleMember-info-memberUsername"><span>Username:</span><input type="text" value={save[member.id] ? save[member.id].username : ""} onChange={(e) => setSave({ ...save, [member.id]: { ...save[member.id], username: e.target.value } })} /></span>
                                                    <span className="user__main-applicants-displayTeams-singleTeam-teamMembers-singleMember-info-memberPassword"><span>Password:</span><input type="text" value={save[member.id] ? save[member.id].password : ""} onChange={(e) => setSave({ ...save, [member.id]: { ...save[member.id], password: e.target.value } })} /></span>
                                                    <span className="user__main-applicants-displayTeams-singleTeam-teamMembers-singleMember-info-memberTeam">
                                                        <span>Team:</span>
                                                        <select onChange={(e) => setSave({ ...save, [member.id]: { ...save[member.id], team_id: (teams.find(team => team.team_name == e.target.value && team.company_id == user.company_id).id) } })}>
                                                            <option hidden>must fill</option>
                                                            {teams.filter(team => team.company_id == user.company_id && team.team_name != "Applicants").map(team => { return (<option key={team.id} >{team.team_name}</option>) })}
                                                        </select>
                                                    </span>
                                                    <button type="submit" className="user__main-applicants-displayTeams-singleTeam-teamMembers-singleMember-info-button">Approve</button>
                                                    <button type="button" className="user__main-applicants-displayTeams-singleTeam-teamMembers-singleMember-info-button">Refuse</button>
                                                    <section className="user__main-applicants-displayTeams-singleTeam-teamMembers-singleMember-info-email">
                                                        <span>Or send an email first:</span>
                                                        <div><span>Subject</span><input type="text" value={email[member.id] ? email[member.id].subject : ""} onChange={(e) => setEmail({ ...email, [member.id]: { ...email[member.id], subject: e.target.value } })} /></div>
                                                        <div><span>Body</span><textarea type="text" value={email[member.id] ? email[member.id].body : ""} onChange={(e) => setEmail({ ...email, [member.id]: { ...email[member.id], body: e.target.value } })}></textarea></div>
                                                    </section>
                                                    <button type="submit" onClick={() => openEmailClient(member.member_email, email[member.id].subject, email[member.id].body)} className="user__main-applicants-displayTeams-singleTeam-teamMembers-singleMember-info-button">Approve & Send the email</button>
                                                </section>
                                            </form>
                                        )
                                    })
                                }
                            </section>
                        </article>
                        )
                    })
                }
            </section>
        </section>
    )
}
export default UserApplicants;