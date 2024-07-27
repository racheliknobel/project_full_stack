import './App.css'

import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import HomePage from './components/HomePage'

import { get } from './utils'

function App() {

  // const dispatch = useDispatch()

  // useEffect(() => {

  //   const getAllData = async () => {
  //     const users = await get("http://localhost:5000/users")
  //     const movies = await get("http://127.0.0.1:5000/subscriptions/movies")
  //     const members = await get("http://127.0.0.1:5000/subscriptions/members")
  //     const subscriptions = await get("http://127.0.0.1:5000/subscriptions/subscriptions")

  //     dispatch({ type: "LOAD", payload: { users, movies, members, subscriptions } })

  //   }

  //   getAllData()

  // }, [])



  return (
    <>
      <HomePage />
    </>
  )
}

export default App
