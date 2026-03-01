import React, { useState } from 'react'

const Form = () => {

    const [Name , setName] = useState('');
    const [Age , setAge] = useState('');
    const [pass , setPass] = useState('');

    function handle(e){
        e.preventDefault(); 

        console.log(Name);
        console.log(Age);
        console.log(pass);
        
    }

    console.log("render");
    

  return (
    <div>
        <form onSubmit={handle}>
            <div>
                <label htmlFor="Name">Name</label>
                <input type="text" id='Name' value={Name} onChange={(e)=>setName(e.target.value)} />
            </div>

            <div>
                <label htmlFor="Name">Name</label>
                <input type="number" id='Name' value={Age} onChange={(e)=>setAge(e.target.value)} />
            </div>

            <div>
                <label htmlFor="Name">Name</label>
                <input type="password" id='Name' value={pass} onChange={(e)=>setPass(e.target.value)} />
            </div>

            <button>Submit</button>
      </form>
    </div>
  )
}

export default Form
