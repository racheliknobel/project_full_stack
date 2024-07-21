import {useState} from 'react'

export default function CreateAccount() {
    const [newUser, setNewUser] = useState({})

    const create = async() => {
        
    }
  return (
    <div>
         <h2>CreateAccount</h2>
            User name: <input type="text" onChange={e => setNewUser({ ...user, userName: e.target.value })}></input><br />
            Password: <input type="text" onChange={e => setNewUser({ ...user, password: e.target.value })}></input><br />
            <button onClick={create}>Create</button><br />
    </div>
  )
}
