import { useForm } from "react-hook-form"

import React from 'react'

const Hook = () => {

    const { register, handleSubmit , formState:{errors} } = useForm(); 
    function onSubmit(data){
        console.log(data);
        
    }

    console.log("render");
    


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="Name">Name</label>
                <input type="text" id='Name' {...register("name", 
                    {
                        required: "Name Can't be empty"
                    }
                )}  />
                {errors.name && <span>{errors.name.message}</span>}
            </div>

            <div>
                <label htmlFor="Name">Name</label>
                <input type="number" id='Name' {...register("age")}  />
            </div>

            <div>
                <label htmlFor="Name">Name</label>
                <input type="password" id='Name' {...register("pass")}  />
            </div>

            <button>Submit</button>
      </form>
    </div>
  )
}

export default Hook
