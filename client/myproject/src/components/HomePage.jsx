import React from 'react'
import { Router, Routes, Route } from 'react-router-dom'

import CreateAccount from './CreateAccount'
import Login from './Login'
import MainPage from './MainPage'
import Movies from './Items'
import Members from './Members'
import Users from './Users'
import Details from './Details'
import Items from './Items'

export default function HomePage() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path={'/createAccount'} element={<CreateAccount />} />

        <Route path={'/mainPage'} element={<MainPage />} >

          <Route path={'movies'} element={<Items displayMovies={true} />} />
          <Route path={"addMovie"} element={<Details addMovie={true} />} />
          <Route path={'editMovie/:id'} element={<Details editMovie={true} />} />

          <Route path={'members'} element={<Items displayMembers={true} />} />
          <Route path={"addMember"} element={<Details addMember={true} />} />
          <Route path={'editMember/:id'} element={<Details editMember={true} />} />

          <Route path={'users'} element={<Items displayUsers={true} />} />
          <Route path={"addUser"} element={<Details addUser={true} />} />
          <Route path={'editUser/:id'} element={<Details editUser={true} />} />

        </Route >

      </Routes >
    </div >
  )
}
