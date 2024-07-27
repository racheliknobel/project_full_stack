import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { get } from '../utils'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from "axios"

// import AccountCircle from '@mui/icons-material/AccountCircle';

export default function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [{ userName, password }, setUser] = useState({})

  const login = async (event) => {
    event.preventDefault()


    const userExists = await axios.post(`http://127.0.0.1:8000/users/login`, { userName, password })

    if (userExists.data.isAuthenticated == true) {
    
      dispatch({ type: "USER", payload: userExists.data.data })
      console.log(`User logged in`)
      navigate("/mainPage")
    } else {
      alert("Login failed: username or password is incorrect")
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          {/* <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> */}
          <TextField id="input-with-sx" label="UserName" variant="standard" required onChange={e => setUser({ userName: e.target.value, password })} />
        </Box>
        <br></br>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          {/* <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> */}
          <TextField id="input-with-sx" label="Password" variant="standard" required onChange={e => setUser({ userName, password: e.target.value })} />
        </Box>

        <br></br><br></br>

        <Button variant="contained" onClick={login}>Login</Button>

      </form>

      <br></br><br></br>
      {/*  */}
      <h4>New User ?</h4>
      <Link to="/createAccount">Create Account</Link>


    </div>
  )
}
