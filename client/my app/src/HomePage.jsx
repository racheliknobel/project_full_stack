import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


import Login from './Login'
import CreateAccount from './CreateAccount'
import MainPage from './MainPage';


export default function HomePage() {
  return (
    <div>
        <Router>
        <Routes>
        <Route path="" element={<Login />} />
        <Route path={'/createAccount'} element={<CreateAccount />} />
        <Route path={'/mainPage/:id'} element={<MainPage />} />

        </Routes>
        </Router>
    </div>
  )
}
