import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { UidContext } from "./AppContext";
import { useContext } from "react";


const LeftNav = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to='/' exact activeClassName="active-left-nav">
            <img src="./img/icons/home.svg" alt="home"/>
          </NavLink>
          <br/>
          <NavLink to='/Posting' exact activeClassName="active-left-nav">
            <img src="./img/icons/rocket.svg" alt="home"/>
          </NavLink>
          <br/>
          <NavLink to='/profil' exact activeClassName="active-left-nav">
            <img src="./img/icons/user.svg" alt="home"/>
          </NavLink>
          <NavLink to='/UserList' exact activeClassName="active-left-nav">
          <img src="https://img.icons8.com/office/30/000000/user-male.png"/>
                    </NavLink>        
          {uid && <NavLink to='/PostList' exact activeClassName="active-left-nav">
          <img src="https://img.icons8.com/office/30/000000/binoculars.png"/>
          </NavLink>}
          <NavLink to='/Messenger' exact activeClassName="active-left-nav">
          <img src="https://img.icons8.com/office/30/000000/binoculars.png"/>
          </NavLink>
    
        </div>
      </div>
    </div>
  );
};

export default LeftNav;