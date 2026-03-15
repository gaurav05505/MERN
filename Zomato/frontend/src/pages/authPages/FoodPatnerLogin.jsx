import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../../Css/authstyle.css'
import axios from 'axios';

const FoodPatnerLogin = () => {

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

    const res = await axios.post('http://localhost:3000/api/auth/foodpatner/login' , 
            formData,
            {
                withCredentials:true
            }
        )

        console.log(res.data);

        navigate('/fh')

    }

    

  return (
    
    <div className={`bg ${isLightMode ? 'light-mode' : ''}`}>
        
        <button className="theme-toggle" onClick={() => setIsLightMode(!isLightMode)}>
            Switch to {isLightMode ? 'Dark' : 'Light'} Mode
        </button>

        <button 
        className="Change-Mode"
        onClick={() => navigate("/user/login")}
        >
            Login as User
        </button>

        <div className='container'> 
            <div className='heading'>
                <h1>Food Patner Login</h1>
                <p>Welcome back! Log in to continue managing your food business.</p>
            </div>

            <div className='user'>
                <form onSubmit={handleForm} action="">
            
                    <div className='field'>
                        <label htmlFor="email">Enter Your Email</label>
                        <input name='email' value={formData.email} onChange={handleSubmit} type="text" placeholder='Your email...' />
                    </div>

                    <div className='field'>
                        <label htmlFor="password">Enter Your Password</label>
                        <input name='password' value={formData.password} onChange={handleSubmit} type="password" placeholder='Your password...' />
                    </div>

                    <div className='r-cta'>
                        <button type='submit'>Login</button>
                        <p>Don't have an account? <a href="/foodpatner/register">Signup</a></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default FoodPatnerLogin
