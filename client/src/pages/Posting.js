  
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import LeftNav from '../components/LeftNav';
import { isEmpty } from "../components/Utils";
import Card from "../components/Post/Card";
import FriendsHint from "../components/Profil/FriendsHint";
import Searchbytittle from "../components/Post/Searchbytittle";


const Posting = () => {
  const uid = useContext(UidContext);
  const trendList = useSelector((state) => state.postingReducer);
  const List = useSelector((state) => state.postReducer);


  return <div className="trending-page">
    <LeftNav />
    <div className="main">
    <Searchbytittle/>

      <ul>
        {!isEmpty(trendList[0]) &&  trendList.map((post) => <Card post={post} key={post._id} />)}
      </ul>
      <ul>
        {!isEmpty(List[0]) &&  List.map((post) => <Card post={post} key={post._id} />)}
      </ul>

 
    </div>
    
    <div className="right-side">
      <div className="right-side-container">
        {uid && <FriendsHint />} 
      </div>
    </div>
  </div>;
};

export default Posting;