import React, { useState } from 'react'
import { loginUser } from "../../actions/auth.action"
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'

const Signin = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }, history));
        setEmail("");
        setPassword("")
    }
    return (
        
        <div>
            <form action="" onSubmit={handleSubmit} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>

        </div>
    )
}
export default Signin
