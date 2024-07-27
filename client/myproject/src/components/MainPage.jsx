import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { get } from '../utils'



export default function MainPage() {

    const user = useSelector((store) => store.user)

    const dispatch = useDispatch()

    useEffect(() => {
        const getAllData = async () => {
            const movies = await get("http://127.0.0.1:8000/subscriptions/movies")
            const members = await get("http://127.0.0.1:8000/subscriptions/members")
            const subscriptions = await get("http://127.0.0.1:8000/subscriptions/subscriptions")
            console.log(user)

            if (user.userName === "admin@gmail.com") {
                const users = await get("http://localhost:8000/users");
                dispatch({ type: "LOAD", payload: { movies, members, subscriptions, users } });

            } else {
                dispatch({ type: "LOAD", payload: { movies, members, subscriptions } });
            }
        };

        getAllData()

    }, [])

    return (
        <div>

            <nav>
                <ul className='navbar'>
                    <li><Link className='link' to={'movies'}>Movies </Link></li>
                    <li><Link className='link' to={'members'}>Subscriptions </Link></li>
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
