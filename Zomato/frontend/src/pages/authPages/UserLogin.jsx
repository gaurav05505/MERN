import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../../Css/authstyle.css'
import axios  from 'axios';


const UserLogin = () => {
  const[isLightMode, setIsLightMode] = useState(false);
  const navigate = useNavigate();


  const [formData , setFormData] = useState({
    email: "", 
    password: ""
  })

  const handleSubmit = (e)=>{
    setFormData({
        ...formData,
        [e.target.name] : e.target.value
    })
  }

  const handleForm = async (e) => {
    e.preventDefault();

    const res = await axios.post('http://localhost:3000/api/auth/user/login' , 
        formData,
        {
            withCredentials:true
        }
    )

    console.log(res.data);

    navigate('/')

  }



  return ( 
    
    <div className={`bg ${isLightMode ? 'light-mode' : ''}`}>
        
        {/* Simple button to toggle theme for testing */}
        <button className="theme-toggle" onClick={() => setIsLightMode(!isLightMode)}>
            Switch to {isLightMode ? 'Dark' : 'Light'} Mode
        </button>

        <button 
        className="Change-Mode"
        onClick={() => navigate("/foodpatner/login")}
        >
            Login as Food Partner
        </button>

        <div className='container'> 
            <div className='heading'>
                <h1>Login Back To Your account</h1>
                <p>Join the community of food lovers and start ordering.</p>
            </div>

            <div className='user'>
                <form onSubmit={handleForm} action="">
            
                    <div className='field'>
                        <label htmlFor="email">Enter Your Email</label>
                        <input type="text" name='email' value={formData.email} onChange={handleSubmit}  placeholder='Your email...' />
                    </div>

                    <div className='field'>
                        <label htmlFor="password">Enter Your Password</label>
                        <input type="password" name='password' value={formData.password} onChange={handleSubmit} placeholder='Your password...' />
                    </div>

                    <div className='r-cta'>
                        <button type='submit'>Login</button>
                        <p>Don't have an account? <a href="/user/register">Signup</a></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default UserLogin
