import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { AuthContext } from "../../context";
import { useContext } from "react";

function Header(props) {

  // const navigate = useNavigate();
  const { signout } = useContext(AuthContext);

//  async function handleLogout() {
//     localStorage.removeItem("JWT_REPORTS");
//     document.cookie = "cookieUserName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
//     document.cookie = "cookieUserName.sig= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
//     navigate('/login');
//     //props.history.push('/login')
// }

  return (
    <nav className={`navbar navbar-dark ${styles.nav_color}`}>
    <div className="row col-12n d-flex justify-content-center text-white">
      <div>
          <NavLink to="/">
             <button className="btn btn-success m-2">Accueil</button>
          </NavLink>
          <NavLink to="/listpage">
              <button className="btn btn-success m-2">Listpage</button>
          </NavLink>
          <NavLink to="/profilpage">
              <button className="btn btn-success m-2">profilpage</button>
          </NavLink>
      </div>
    </div>
    <div className="ml-auto">
    <NavLink to="/signin">
        <button className="btn btn-info m-2">Signin</button>
    </NavLink>
    {/* <NavLink to="/login">
        <button className="btn btn-info m-2">Login</button>
    </NavLink> */}
    <button className="btn btn-danger m-2" onClick={() => signout()}>Logout</button>
    
    </div>
</nav>
  );
}

export default Header;