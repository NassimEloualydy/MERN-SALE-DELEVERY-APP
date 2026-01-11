import React from 'react'
import Home from '../components/Home'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Login from '../components/Login'
import YourAccount from '../components/YourAccount'
import PrivateRoutes from './PrivateRoutes'
import Products from '../components/Products'
import ProductForm from '../components/ProductForm'
import SignIn from '../components/signIn'
import ProductDetails from '../components/ProductDetails'
const RouteSystem = () => {
  return (
    <div>
        <Router>
            <>
            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path='/signIn' element={<SignIn/>}/>
                <Route element={<PrivateRoutes/>}>
                  <Route path="/your_account" element={<YourAccount/>}/>
                  <Route path="/products" element={<Products/>}/>
                  <Route path="/productform" element={<ProductForm/>}/>
                  <Route path='/productDetails' element={<ProductDetails/>}/>
                </Route>
            </Routes>
            </>
        </Router>
    </div>
  )
}

export default RouteSystem