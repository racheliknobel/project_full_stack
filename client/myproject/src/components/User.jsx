import React from 'react'
import { Link } from 'react-router-dom'

export default function User({ userData }) {
    return (
        <div className='movieCard'>
            <h2>{userData.firstName}&nbsp;{userData.lastName}</h2>
            <h4>User Name: {userData.userName}</h4>
            <h4>Created Date: {userData.createdDate}</h4>
            <h4>Permissions:
                {userData.permissions.length > 0
                    ? userData.permissions
                        .map((p, index) => <ul>
                            <li key={index}>{p}</li>
                            <br></br>
                        </ul>)
                    : " No Permissions"
                }

            </h4>

            <Link to={`/mainPage/editUser/${userData._id}`}><button>Edit</button></Link>&nbsp;
            <button >Delete</button>

            <br></br><br></br>

        </div>
    )
}
