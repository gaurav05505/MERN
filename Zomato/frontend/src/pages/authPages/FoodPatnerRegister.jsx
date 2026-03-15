import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../../Css/authstyle.css'
import axios from 'axios';

const FoodPatnerRegister = () => {
  const[isLightMode, setIsLightMode] = useState(false);
  const navigate = useNavigate();

  const [formData , setFormData] = useState({
    Name: "", 
    bName: "", 
    address: "", 
    email: "", 
    password: ""
  })

  const formHandler = (e) =>{
    setFormData({
        ...formData, 
        [e.target.name] : e.target.value
    })
  }

  const handleForm = async (e) =>{
    e.preventDefault();

    const res = await axios.post('http://localhost:3000/api/auth/foodpatner/register' , 
        formData,
        {
            withCredentials : true
        }
    )

    console.log(res.data);

    navigate('/fh')

  }
 

  
    return (
      
      <div className={`bg ${isLightMode ? 'light-mode' : ''}`}>
          
          {/* Simple button to toggle theme for testing */}
          <button className="theme-toggle" onClick={() => setIsLightMode(!isLightMode)}>
              Switch to {isLightMode ? 'Dark' : 'Light'} Mode
          </button>

        <button 
        className="Change-Mode"
        onClick={() => navigate("/user/register")}
        >
            Register as User
        </button>
  
          <div className='container'> 
              <div className='heading'>
                  <h1>Partner with Us</h1>
                  <p>Create your partner account and manage your restaurant with ease.</p>
              </div>
  
              <div className='user'>
                  <form onSubmit={handleForm} action="">
                      <div className='r-d'>
                        <div className='field'>
                          <label htmlFor="name">Enter Your Name</label>
                          <input name='Name' value={formData.Name} onChange={formHandler} type="text" placeholder='Your Name...' />
                        </div>

                        <div className='field'>
                          <label htmlFor="b-name">Business Name</label>
                          <input name='bName' value={formData.bName} onChange={formHandler} type="text" placeholder='Business Name...' />
                        </div>

                      </div>


                      <div className='r-d'>

                        <div className='field'>
                            <label htmlFor="email">Enter Your Email</label>
                            <input name='email' value={formData.email} onChange={formHandler} type="text" placeholder='Your email...' />
                        </div>

                        <div className='field'>
                            <label htmlFor="password">Create a Password</label>
                            <input name='password' value={formData.password} onChange={formHandler} type="password" placeholder='password...' />
                        </div>
                      
                      </div>

                      <div className='field'>
                          <label htmlFor="address">Full Address</label>
                          <input name='address' value={formData.address} onChange={formHandler} type="text" placeholder='Help Customer to find your shop..' />
                      </div>
  
                      <div className='r-cta'>
                          <button type='submit'>Create Account</button>
                          <p>Already have an account? <a href="/foodpatner/login">Login</a></p>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    )
}

export default FoodPatnerRegister
