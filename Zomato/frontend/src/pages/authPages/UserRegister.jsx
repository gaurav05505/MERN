import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../../Css/authstyle.css'
import axios from 'axios'; 

const UserRegister = () => {
  
  const[isLightMode, setIsLightMode] = useState(false);
  const navigate = useNavigate();

  const [formData , setFormData] = useState({fullName: "" , email: "" , password: ""});

  const handleSubmit = (e)=>{
    setFormData({
        ...formData,
        [e.target.name] : e.target.value
    })
  }

  const formHandler = async (e) =>{
    e.preventDefault();

    const res = await axios.post('http://localhost:3000/api/auth/user/register' , 
        formData,
        {
            withCredentials: true
        }
    )

    console.log(res.data);

    navigate('/')
    
    

  }

  return (
    // Added dynamic class based on state
    <div className={`bg ${isLightMode ? 'light-mode' : ''}`}>
        
        {/* Simple button to toggle theme for testing */}
        <button className="theme-toggle" onClick={() => setIsLightMode(!isLightMode)}>
            Switch to {isLightMode ? 'Dark' : 'Light'} Mode
        </button>

        <button 
        className="Change-Mode"
        onClick={() => navigate("/foodpatner/register")}
        >
            Become a Food Partner
        </button>



        <div className='container'> 
            <div className='heading'>
                <h1>Create Your Account</h1>
                <p>Join the community of food lovers and start ordering.</p>
            </div>

            <div className='user'>
                <form onSubmit={formHandler} action="">
                    <div className='field'>
                        <label htmlFor="name">Enter Your Name</label>
                        <input type="text" name='fullName' value={formData.name} onChange={handleSubmit} placeholder='Your Name...' />
                    </div>

                    <div className='field'>
                        <label htmlFor="email">Enter Your Email</label>
                        <input type="text" name='email' value={formData.email} onChange={handleSubmit} placeholder='Your email...' />
                    </div>

                    <div className='field'>
                        <label htmlFor="password">Create a Password</label>
                        <input type="password" name='password' value={formData.password} onChange={handleSubmit} placeholder='Create a strong password...' />
                    </div>

                    <div className='r-cta'>
                        <button type='submit'>Create Account</button>
                        <p>Already have an account? <a href="/user/login">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default UserRegister