import UserNav from "../../components/UserNav/UserNav";
import UserTeams from "../../components/UserTeams/UserTeams";
import UserApplicants from "../../components/UserApplicants/UserApplicants";
import { useState } from "react";
import "./User.scss"

function User() {

  const user = JSON.parse(sessionStorage.getItem("user"));
  const [hideNav, setHideNav] = useState(true);
  const [menu,setMenu]=useState('teams');
  const handleMenu=(state)=>{
    setMenu(state);
  }
  return (
    <div className="user">
      <main className="user__main">
        <UserNav hideNav={hideNav} setHideNav={setHideNav} handleMenu={handleMenu} menu={menu}/>
        <UserTeams setHideNav={setHideNav} menu={menu}/>
        <UserApplicants setHideNav={setHideNav} menu={menu}/>
      </main>
    </div>
  )
}
export default User;