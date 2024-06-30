import LeftNav from "../../components/LeftNav/LeftNav";
function UserInterfacePage({memberInfo}){
  console.log(memberInfo);
    return(
        <div className="user_interface_page">
          <LeftNav />
        </div>
    )
}
export default UserInterfacePage;