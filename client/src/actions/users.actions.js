import axios from "axios";

export const GET_USERS = "GET_USERS";
export const DELETE_USER = "DELETE_USER";



export const getUsers = ()=> async dispatch =>{
  try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/`)
      dispatch({ type: GET_USERS, payload: res.data })
  } catch (error) {
      console.log(error)
  }
}
export const deleteUser = (userId)=> async dispatch =>{
  try {
      await axios.delete(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
      dispatch({ type: DELETE_USER, payload: { userId } })
  } catch (error) {
      console.log(error)
  }
}