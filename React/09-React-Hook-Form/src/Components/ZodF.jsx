import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";

import React from 'react'

const formSchema = z.object({
    name: z.string().min(2 , "Min len can be 2").max(20 , "max lan can be 20"), 
    age:z.coerce.number().min(10 , "min age can be 10").max(80 , "max age can be 80"), 
    pass:z.string().min(5 , "create pass greater then 5len "). max(30 , "its too long")
})

const ZodF = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver : zodResolver(formSchema)
    }); 

    function onSubmit(data){
        console.log(data);
        
    }

    console.log("render");
        
    
    
      return (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="Name">Name</label>
                    <input type="text" id='Name' {...register("name")}  />
                    <span>{errors.name?.message}</span>
                </div>
    
                <div>
                    <label htmlFor="age">age</label>
                    <input type="number" id='age' {...register("age")}  />
                    <span>{errors.age?.message}</span>
                </div>
    
                <div>
                    <label htmlFor="pass">password</label>
                    <input type="password" id='pass' {...register("pass")}  />
                    <span>{errors.pass?.message}</span>
                </div>
    
                <button>Submit</button>
          </form>
        </div>
      )
}

export default ZodF;
