import React, { useRef } from "react";
import { fetchSearchposts} from "../../actions/post.actions";
import "./Searchinput.css"

import { useDispatch } from "react-redux";
import axios from "axios";


const Searchbytittle = () => {

  const searchValue = useRef();

  let dispatch = useDispatch();
  const searchposter = () => {
    dispatch(fetchSearchposts(searchValue.current.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="section search">
  
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            name="name"
            id="posterTittle"
            placeholder ="Search Posts"
            ref={searchValue}
            onChange={searchposter}
          />
        </div>
      </form>
    </section>
  );
};

export default Searchbytittle;
