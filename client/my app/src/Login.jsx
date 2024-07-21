import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from "./utils"


export default function Login() {
    const [user, setUser] = useState({})
    
    const [msg, setMsg] = useState("")

    const navigate = useNavigate()


    const login = async() => {
        const data = await loginUser(user)
        
console.log(data)
console.log(user)
    
            if (data.statusUser == true) {
                navigate(`/mainPage/`)
                
            }
            
            else {
                setMsg(data.data)
            }
        }
   
    
    return (
        <div>
            <h2>Login</h2>
            User name: <input type="text" onChange={e => setUser({ ...user, userName: e.target.value })}></input><br />
            Password: <input type="text" onChange={e => setUser({ ...user, password: e.target.value })}></input><br />
            <button onClick={login}>Login</button><br />
            <span>{msg}</span>
            <br /><br />
            New User? <Link to="/createAccount">Create account</Link>


        </div>
    )
    }
