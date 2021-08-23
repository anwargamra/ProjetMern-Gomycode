import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrends } from "../actions/post.actions";
import { isEmpty } from "./Utils";
import { UidContext } from "./AppContext";
import { useContext } from "react";
import DeleteCard from "./Post/DeleteCard";


import { NavLink } from "react-router-dom";

const Posts = () => {
  const posts = useSelector((state) => state.allPostsReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const trendList = useSelector((state) => state.postingReducer);
  const dispatch = useDispatch();
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);


  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      let sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length;
      });
      sortedArray.length = 10;
      dispatch(getTrends(sortedArray));
    }
  }, [posts, dispatch]);

  return (

    <div className="trending-container">

      <h4>Posts</h4>
      <NavLink exact to="/Posting">
        <ul>
          {trendList.length &&
            trendList.map((post) => {
              return (
                <li key={post._id}>
                  <div>
                    {post.picture && <img src={post.picture} alt="post-pic" />}
                    {post.video && (
                      <iframe
                        src={post.video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={post._id}
                      ></iframe>
                    )}
                    {isEmpty(post.picture) && isEmpty(post.video) && (
                      <img src={usersData[0] && usersData.map((user) => {
                        if (user._id === post.posterId )  {
                          return user.picture;
                        } else return null;
                      })
                      .join("")
                    } alt="profil-pic"/>
                    )}
                  </div>
                  
                  <div className="trend-content">
                    <p>{post.message}</p>  
                   {(uid  && (userData.role)== "Admin") ?

                    <DeleteCard  id={post._id} /> :(
                      <ul>
                        <li>
                          <NavLink exact to="/home">
                            <img src="./img/icons/home.svg" alt="home"/>
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
        </ul>
      </NavLink>
    </div>
  );
};

export default Posts;
