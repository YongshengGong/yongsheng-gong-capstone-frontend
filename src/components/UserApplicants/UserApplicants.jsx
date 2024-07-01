import "./UserApplicants.scss"
import { MenuOutlined } from '@ant-design/icons';
import { useState,useEffect } from "react";
import axios from "axios";


function UserApplicants({ setHideNav }) {
    const port = import.meta.env.VITE_PORT;
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [teams, setTeams] = useState(null);
    const [members, setMembers] = useState(null);
    const [spreadPersonalInfo, setSpreadPersonalInfo] = useState({});
    useEffect(() => {
        const fetch = async () => {
            const allTeams = await axios.get(`${port}/teams`);
            setTeams(allTeams.data);
            const allMembers = await axios.get(`${port}/members`);
            setMembers(allMembers.data);
        }
        fetch();
    }, []);
    if (!teams || !members) {
        return (<>loading...</>)
    }
    const handleChildClick=(event)=>{
        event.stopPropagation();
    }
    return (
        <section className="user__main-applicants" onClick={()=>setSpreadPersonalInfo(false)}>
        {
            teams.filter(team=>team.team_name=="Applicants' Zone" && team.company_id==user.company_id).map(team => {
                return (<article className="user__main-applicants-singleTeam" key={team.id}>
                    <span className="user__main-applicants-singleTeam-teamName">{team.team_name}</span>
                    <section className="user__main-applicants-singleTeam-teamMembers">
                        {
                            members.filter(member => member.team_id == team.id).map((member) => {
                                return (
                                    <article className="user__main-applicants-singleTeam-teamMembers-singleMember" key={member.id} onClick={handleChildClick}>
                                        <span className="user__main-applicants-singleTeam-teamMembers-singleMember-title" onClick={() => setSpreadPersonalInfo({...spreadPersonalInfo,[member.member_name]:true})}>{member.member_name}</span>
                                        <section className={spreadPersonalInfo[member.member_name] == true ?
                                            "user__main-applicants-singleTeam-teamMembers-singleMember-info":
                                            "user__main-applicants-singleTeam-teamMembers-singleMember-info user__main-applicants-singleTeam-teamMembers-singleMember-info--hidden"
                                        }>
                                            <span className="user__main-applicants-singleTeam-teamMembers-singleMember-info-memberName"><span>Name:</span><span>{member.member_name}</span></span>
                                            <span className="user__main-applicants-singleTeam-teamMembers-singleMember-info-memberTitle"><span>Title:</span><span>{member.member_title}</span></span>
                                            <span className="user__main-applicants-singleTeam-teamMembers-singleMember-info-memberEmail"><span>Email:</span><span>{member.member_email}</span></span>
                                            <span className="user__main-applicants-singleTeam-teamMembers-singleMember-info-memberPhone"><span>Phone:</span><span>{member.member_phone}</span></span>
                                            <span className="user__main-applicants-singleTeam-teamMembers-singleMember-info-memberAddress"><span>Address:</span><span>{member.member_address}</span></span>
                                            <span className="user__main-applicants-singleTeam-teamMembers-singleMember-info-memberUsername"><span>Username:</span><span>{member.username}</span></span>
                                            <span className="user__main-applicants-singleTeam-teamMembers-singleMember-info-memberPassword"><span>Password:</span><span>{member.password}</span></span>
                                        </section>
                                    </article>
                                )
                            })
                        }
                    </section>
                </article>
                )
            })
        }
    </section>
    )
}
export default UserApplicants;