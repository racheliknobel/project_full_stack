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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({ userName: '', password: '' });

  const [loginUser, setLoginUser] = useState(true)


  const login = async (e) => {
  
    e.preventDefault(); // כדי למנוע ריענון של העמוד
    const { userName, password } = user;

    try {
      const userExists = await axios.post(`http://127.0.0.1:8000/users/login`, { userName, password });

      if (userExists.data.isAuthenticated) {
        console.log(`User logged in`);

        dispatch({ type: "USER", payload: userExists.data });

        localStorage.setItem('token', userExists.data.data.token);
        navigate("/mainPage");
      } else {
        setLoginUser(false);
        console.error('Login failed: Invalid credentials');

      }
    } catch (error) {
      
      console.error('Login failed:');
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          {/* <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> */}
          <TextField id="input-with-sx" label="UserName" variant="standard" required onChange={e => setUser({ ...user, userName: e.target.value })} />
        </Box>
        <br></br>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          {/* <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> */}
          <TextField id="input-with-sx" label="Password" variant="standard" required onChange={e => setUser({ ...user, password: e.target.value })} />
        </Box>

        <br></br><br></br>

        <Button variant="contained" onClick={login}>Login</Button><br></br>
        {loginUser == true ? "" : <h4> username or password is incorrect</h4>}
      </form>

      <br></br><br></br>
      {/*  */}
      <h4>New User ?</h4>
      <Link to="/createAccount">Create Account</Link>


    </div>
  )
}
