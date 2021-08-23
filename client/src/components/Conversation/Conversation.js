import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./Conversation.css";

function Conversation({Conversation,currentUser}) {
    const userData = useSelector((state) => state.userReducer);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const friendId = Conversation.members.find((m) => m !== currentUser._id);
  
      const getUser = async () => {
        try {
          const res = await axios(`${process.env.REACT_APP_API_URL}api/user/${friendId}`);
          setUser(res.data);
          console.log(res.data)
        } catch (err) {
          console.log(err);
        }
      };
      getUser();
    }, [currentUser, Conversation]);

    return (
        <div className="conversation">
      <img className="conversationImg" src = {user?.picture} />
      <span className="conversationName"> {user?.pseudo}</span>
    </div>
    )
}

export default Conversation
