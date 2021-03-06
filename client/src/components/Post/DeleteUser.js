import React from "react";
import { useDispatch } from "react-redux";
import {deleteUser } from "../../actions/users.actions";

const DeleteUser = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deleteUser(props.id));

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
          deleteQuote();
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="trash" />
    </div>
  );
};

export default DeleteUser;
