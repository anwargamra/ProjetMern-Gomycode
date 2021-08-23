import React, { useEffect, useState } from "react";
import { useContext } from "react";
import DeleteUser from "../components/Post/DeleteUser";

import { useSelector } from "react-redux";
import { isEmpty } from "../components/Utils";
//import FollowHandler from "./FollowHandler";
import { UidContext } from "../components/AppContext";
import { NavLink } from "react-router-dom";
import Searchbypseudo from  "../components/Post/Searchbypseudo"

import LeftNav from "../components/LeftNav";

const FriendsHint = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [friendsHint, setFriendsHint] = useState([]);
  const usersData = useSelector((state) => state.searchReducer);

  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    const FriendList = () => {
      let array = [];
      usersData.map((user) => {
        if (user._id !== userData._id )
          return array.push(user._id);
      });
      array.sort(() => 0.5 - Math.random());
      if (window.innerHeight > 780) {
        array.length = 5;
      } else if (window.innerHeight > 720) {
        array.length = 7;
      } else if (window.innerHeight > 615) {
        array.length = 6;
      } else if (window.innerHeight > 540) {
        array.length = 1;
      } else {
        array.length = 0;
      }
      setFriendsHint(array);
    };

    if ( !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      FriendList();
      setIsLoading(false);
    }
  }, [usersData, userData]);
  return (
    <div className="userlist">
      <LeftNav />

      <div className="friends-container">
      <Searchbypseudo/>

        <h4>Users</h4>
        {isLoading ? (
          <div className="icon">
            <i className="fas fa-spinner fa-pulse"></i>
          </div>
        ) : (
          <ul>
            {friendsHint &&
              friendsHint.map((user) => {
                for (let i = 0; i < usersData.length; i++) {
                  if (user === usersData[i]._id) {
                    return (
                      <li className="user-hint" key={user}>
                        <img src={usersData[i].picture} alt="user-pic" />
                        <p>{usersData[i].pseudo} </p>
                        <span>{usersData[i].createdAt}</span>
                        <h5> {userData.pseudo} Delete {usersData[i].pseudo} </h5>

                        {uid && userData.role == "Admin" ? (
                          <div>
                            <button>
                              {" "}
                              <DeleteUser id={usersData[i]._id} />{" "}
                            </button>
                            
                          </div>
                          
                        ) : (
                          <ul>
                            <li>
                              <NavLink exact to="/home">
                                <img src="./img/icons/home.svg" alt="home" />
                              </NavLink>
                            </li>
                          </ul>
                        )}
                      </li>
                    );
                  }
                }
              })}
          </ul>
        )}
      </div>
   
    </div>
  );
};

export default FriendsHint;
