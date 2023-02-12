import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

function Header(props) {

  function handleLogout() {
    localStorage.removeItem("JWT_REPORTS")
    props.history.push('/login')
}

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
      </div>
    </div>
    <div className="ml-auto">
   
    <NavLink to="/login">
        <button className="btn btn-info m-2">Login</button>
    </NavLink>
    <button className="btn btn-danger m-2" onClick={() => handleLogout()}>Logout</button>
    
    </div>
</nav>
  );
}

export default Header;