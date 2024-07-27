import React from 'react'

export default function CreateAccount() {
  return (
    <div>
      <h2>Create an Account</h2>


      <h3>User Name</h3><input type='text' required />
      <h3>Password</h3><input type='text' required />

      <br></br><br></br>

      <button>Create</button>

      <br></br><br></br>
    </div>
  )
}
