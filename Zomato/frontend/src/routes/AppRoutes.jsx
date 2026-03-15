import React from 'react'
import { BrowserRouter, Routes, Route, Router } from "react-router-dom"
import UserRegister from '../pages/authPages/UserRegister'
import UserLogin from '../pages/authPages/UserLogin'
import FoodPatnerLogin from '../pages/authPages/FoodPatnerLogin'
import FoodPatnerRegister from '../pages/authPages/FoodPatnerRegister'
import Home from '../pages/GenralPage/Home'
import FoodpatnerHome from '../pages/GenralPage/FoodpatnerHome'
import FoodPartnerprofile from '../pages/GenralPage/FoodPartnerprofile'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes >

            <Route path='/user/register' element={<UserRegister />} />
            <Route path='/user/login' element={<UserLogin />} />
            <Route path='/foodpatner/register' element={<FoodPatnerRegister />} />
            <Route path='/foodpatner/login' element={<FoodPatnerLogin />} />
            <Route path='/' element={<Home />} />
            <Route path='/fh' element={<FoodpatnerHome />} />
            <Route path='/foodpatner/:id' element={<FoodPartnerprofile />} />

        </Routes>
      
    </BrowserRouter>
  )
}

export default AppRoutes
