import React from 'react'
import Home from '../components/Home'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Login from '../components/Login'
import YourAccount from '../components/YourAccount'
import PrivateRoutes from './PrivateRoutes'
const RouteSystem = () => {
  return (
    <div>
        <Router>
            <>
            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route element={<PrivateRoutes/>}>
                  <Route path="/your_account" element={<YourAccount/>}/>
                </Route>
            </Routes>
            </>
        </Router>
    </div>
  )
}

export default RouteSystem