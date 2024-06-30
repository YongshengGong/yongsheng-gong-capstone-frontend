import "./UserApplicants.scss"
import { MenuOutlined } from '@ant-design/icons';
import { Input } from 'antd';

function UserApplicants({setHideNav}) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const { Search } = Input;
    // const onSearch = value => console.log(value);
    return (
        <section className="user__applicants">
            <h1 className="user__applicants-title">Welcome {user.member_name}</h1>
            <nav className="user__applicants-nav">
                <MenuOutlined className="user__applicants-nav-home" onClick={()=>setHideNav(false)} />
                <Search
                    className="user__applicants-nav-search"
                    allowClear
                    style={{width: 200}}
                    // onSearch={onSearch}
                />
            </nav>
        </section>
    )
}
export default UserApplicants;