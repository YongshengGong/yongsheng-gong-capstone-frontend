import UserNav from "../../components/UserNav/UserNav";
import UserTeams from "../../components/UserTeams/UserTeams";
import UserApplicants from "../../components/UserApplicants/UserApplicants";
import { useState } from "react";
import "./User.scss"

function User() {

  const user = JSON.parse(sessionStorage.getItem("user"));
  const [hideNav, setHideNav] = useState(true);
  return (
    <div className="user">
      <main className="user__main">
        <UserNav hideNav={hideNav} setHideNav={setHideNav} />
        <UserTeams setHideNav={setHideNav} />
        <UserApplicants setHideNav={setHideNav}/>
      </main>
    </div>
  )
}
export default User;