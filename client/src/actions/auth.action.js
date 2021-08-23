
import axios from "axios"
export const LOAD_USER = "LOAD_USER";
export const LOGIN_USER = "LOGIN_USER";
export const FAIL_USER = "FAIL_USER";


export const loginUser = (userAuth, history) => async dispatch => {
    dispatch({ type: LOAD_USER })
    try {
        const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
     
    })

        dispatch({ type: LOGIN_USER, payload: response.data })
        history.push("/")
    } catch (error) {

        const { errors, msg } = error.response.data
        if (msg) { alert(msg) }
        if (Array.isArray(errors)) {
            errors.forEach(err => {
                alert(err.msg)
            })
        }
        dispatch({ type: FAIL_USER, payload: error.response.data })
    }
}

