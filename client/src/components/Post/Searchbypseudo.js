import React, { useRef } from "react";
import { fetchSearchuser} from "../../actions/user.actions";
import "./Searchinput.css"

import { useDispatch } from "react-redux";


const Searchbypseudo = (e) => {

  const searchValue = useRef();

  let dispatch = useDispatch();
  const searchuser = () => {  

    dispatch(fetchSearchuser(searchValue.current.value));
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
            id="pseudo"
            placeholder ="Search pseudo"
            ref={searchValue}
            onChange={searchuser}
          />
        </div>
      </form>
    </section>
  );
};

export default Searchbypseudo;
