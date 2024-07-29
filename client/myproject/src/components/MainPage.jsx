import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { get } from '../utils'



export default function MainPage() {

   const user = useSelector((store) => store.user)
    const dispatch = useDispatch()

    useEffect(() => {

        const getAllData = async () => {

           const token = localStorage.getItem('token')
           

            if (token) {
                try {
                    const responseMovies = await fetch("http://localhost:8000/subscriptions/movies", {
                        method: 'GET',
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const movies = await responseMovies.json();
                    console.log(movies);

                    const responseMembers = await fetch("http://127.0.0.1:8000/subscriptions/members", {
                        method: 'GET',
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const members = await responseMembers.json();

                    const responseSubscriptions = await fetch("http://127.0.0.1:8000/subscriptions/subscriptions", {
                        method: 'GET',
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const subscriptions = await responseSubscriptions.json();

                    dispatch({ type: "LOAD", payload: { movies, members, subscriptions } });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else {
                console.log('No token found')
                throw new Error();
                
            }
        };

       
            getAllData();
        
    }, [ dispatch]);


    return (
        <div>

            <nav>
                <ul className='navbar'>
                    <li><Link className='link' to={'movies'}>Movies </Link></li>
                    <li><Link className='link' to={'members'}>Members </Link></li>
                    <li><Link className='link' to={'subscriptions'}>Subscriptions </Link></li>
                    {user?.userName === "admin@gmail.com"
                        ? <li><Link className='link' to={'users'}>User Management </Link></li>
                        : null}
                    {/* <li className='link'>{user.firstName} &nbsp;{user.lastName} </li>
                    <li><Link className='link' to={"/"}>Log Out </Link></li> */}
                </ul>
            </nav>

            <Outlet />

        </div>
    )
}
