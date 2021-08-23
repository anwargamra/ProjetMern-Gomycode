import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const SEARCH_USER_SUCCESS ="SEARCH_USER_SUCCESS";


export const GET_USER_ERRORS = "GET_USER_ERRORS";


export const getUser = (uid)=> async dispatch =>{
  try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      dispatch({ type: GET_USER, payload: res.data })
  } catch (error) {
      console.log(error)
  }
}
export const fetchSearchuser=(pseudo) => async dispatch  => {
  try {
    await
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/user/pseudo/${pseudo}`
      )
      .then((res) => {
        const pseudo = res.data;
        dispatch( {  type: SEARCH_USER_SUCCESS,
          payload: pseudo,} );
      })}
      catch (error) {
        console.log(error)

      };
  };
export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            });
        }
      })
      .catch((err) => console.log(err));
  };
};


export const updateBio = (userId, bio)=> async dispatch =>{
  try {
       await axios.put(`${process.env.REACT_APP_API_URL}api/user/` + userId,
       { bio })
      dispatch({ type: UPDATE_BIO, payload: { bio} })
  } catch (error) {
      console.log(error)
  }
}

export const followUser = (followerId, idToFollow)=> async dispatch =>{
  try {
       await axios.patch(`${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
       { idToFollow })
      dispatch({ type: FOLLOW_USER, payload: { idToFollow} })
  } catch (error) {
      console.log(error)
  }
}
export const unfollowUser = (followerId, idToUnFollow)=> async dispatch =>{
  try {
       await axios.patch(`${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
       { idToUnFollow })
      dispatch({ type: UNFOLLOW_USER, payload: { idToUnFollow} })
  } catch (error) {
      console.log(error)
  }
}


