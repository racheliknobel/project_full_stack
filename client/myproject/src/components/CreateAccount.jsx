import React, { useEffect, useState } from 'react'
import axios from "axios"



export default function CreateAccount() {
  const [{ userName, password }, setUser] = useState({})
  const [account, setAccount] = useState("")

  const create = async(event) => {
    event.preventDefault()

    const createAccount = await axios.post(`http://127.0.0.1:8000/users`, { userName, password })

    setAccount(createAccount.data)
  
  }
  return (
    <div>
      <h2>Create an Account</h2>


      <h3>User Name</h3><input type='text' required onChange={e => setUser({ userName: e.target.value, password })}/>
      <h3>Password</h3><input type='text' required onChange={e => setUser({ userName, password: e.target.value })}/>

      <br></br><br></br>

      <button onClick={create}>Create</button>

      <br></br><br></br>
     <h3>{account}</h3>
    </div>
  )
}
