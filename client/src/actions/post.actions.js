import axios from "axios";

// posts

export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
//search

export const SEARCH_POSTS_SUCCESS ="SEARCH_POSTS_SUCCESS"



// comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

// trends
export const GET_POSTING = "GET_POSTING";

// errors
export const GET_POST_ERRORS = "GET_POST_ERRORS";


export const getPosts = (num) => async dispatch  => {
  try {
    await axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
        dispatch({ type: GET_ALL_POSTS, payload: res.data });
      })}
      catch(err) {console.log(err);
  };
};

export const fetchSearchposts=(posterTittle) => async dispatch  => {
  try {
    await
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/post/postertittle/${posterTittle}`
      )
      .then((res) => {
        const posterTittle = res.data;
        dispatch( {  type: SEARCH_POSTS_SUCCESS,
          payload: posterTittle,} );
      })}
      catch (error) {
        console.log(error)

      };
  };


export const addPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_POST_ERRORS, payload: "" });
        }
      });
  };
};

export const likePost = (postId, userId)=> async dispatch =>{
  try {
      await axios.patch(`${process.env.REACT_APP_API_URL}api/post/like-post/` +postId,{  id: userId  })
      dispatch({ type: LIKE_POST, payload:{ postId, userId } })
  } catch (error) {
      console.log(error)
  }
}
export const unlikePost = (postId, userId)=> async dispatch =>{
  try {
      await axios.patch(`${process.env.REACT_APP_API_URL}api/post/unlike-post/` +postId,{  id: userId  })
      dispatch({ type: UNLIKE_POST, payload:{ postId, userId } })
  } catch (error) {
      console.log(error)
  }
}

export const updatePost = (postId, posterTittle,message)=> async dispatch =>{
  try {
      await axios.put(`${process.env.REACT_APP_API_URL}api/post/${postId}`,{ posterTittle,message  })
      dispatch({ type: UPDATE_POST, payload: { posterTittle, message, postId } })
  } catch (error) {
      console.log(error)
  }
}


export const deletePost = (postId)=> async dispatch =>{
  try {
      await axios.delete(`${process.env.REACT_APP_API_URL}api/post/${postId}`)
      dispatch({ type: DELETE_POST, payload: { postId } })
  } catch (error) {
      console.log(error)
  }
}
export const addComment = (postId, commenterId, text, commenterPseudo )=> async dispatch =>{
  try {
       await axios.patch(`${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
       {commenterId, text, commenterPseudo})
      dispatch({ type: ADD_COMMENT, payload: { postId } })
  } catch (error) {
      console.log(error)
  }
}



export const editComment = (postId, commentId, text )=> async dispatch =>{
  try {
       await axios.patch(`${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
       {commentId, text})
      dispatch({ type: EDIT_COMMENT, payload: { postId , commentId, text} })
  } catch (error) {
      console.log(error)
  }
}
export const deleteComment = (postId, commentId)=> async dispatch =>{
  try {
       await axios.patch(`${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
       {commentId})
      dispatch({ type: DELETE_COMMENT, payload: { postId , commentId} })
  } catch (error) {
      console.log(error)
  }
}


export const getTrends = (sortedArray) => {
  return (dispatch) => {
    dispatch({ type: GET_POSTING, payload: sortedArray });
  };
};


export const getsearchpostsSuccess = (posterTittle) => {
  return{
  type: SEARCH_POSTS_SUCCESS,
  payload: posterTittle,
  };
};

