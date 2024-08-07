import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteItem } from '../utils'
import { useDispatch } from 'react-redux'
import Subscriptions from './Subscriptions'






export default function Member({ memberData }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    //delete the member
    const deleteMember = async () => {

        const token = localStorage.getItem('token')
        if (token) {
            const deleteItem = await fetch(`http://127.0.0.1:8000/subscriptions/members/${memberData._id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const msg = await deleteItem.json();

            dispatch({ type: "DELETE", payload: memberData, entity: "members" });

            alert(`The member "${memberData.name}" deleted successfully`);
            navigate('/mainPage/subscriptions/members')}
            else { alert('No token found')
        }}


        return (
            <div className='movieCard'>

                <h2>{memberData.name}</h2>

                <h4>Email:  {memberData.email}</h4>
                <h4>City:  {memberData.city}</h4>

                <Link to={`/mainPage/editMember/${memberData._id}`}><button>Edit</button></Link>&nbsp;
                <button onClick={deleteMember}>Delete</button>

                <br></br><br></br>

                <div>
                    <Subscriptions displayMoviesWatched={true} memberId={memberData._id} />
                </div>





            </div>
        )
    }
