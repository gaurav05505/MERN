# React form hook 

--- 

**Why we use React Form hook ? when we already have useState to build form ? 
--> With this useState it render every click on the keyboard to fill input so if we do this user with loww end device will feel lag so we have react form hook. 

```jsx

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

```

## React Hook Form use:- 
--> with this we can handle all that unuse renders and lag internally this hook use useRef --> it use the key reference in side and change the value. so it that way unuse render never happen. 

--> website --> react-hook-form ----> **to download or import this**

```jsx

import { useForm } from "react-hook-form"

import React from 'react'

const Hook = () => {

    const { register, handleSubmit } = useForm(); 
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


```

---

**We have a Error handle power**
--> if we want that user don't left some important input field empty so we use errors.

```jsx

<div>
    <label htmlFor="Name">Name</label>
    <input type="text" id='Name' {...register("name", 
        {
            required: "Name Can't be empty"
        }
    )}  />
    {errors.name && <span>{errors.name.message}</span>}
</div>


```

1. we can you for password 
2. min age max age 
3. len etc etc ...


## Zod 
---> Zod is a TypeScript-first validation library. Using Zod, you can define schemas you can use to validate data, from a simple string to a complex nested object.

**Features**

Zero external dependencies
Works in Node.js and all modern browsers
Tiny: 2kb core bundle (gzipped)
Immutable API: methods return a new instance
Concise interface
Works with TypeScript and plain JS
Built-in JSON Schema conversion
Extensive ecosystem

**Installation**

```
npm install zod

```

-- after you install and define you formSchema you have to install one more thing to intigrate you formSchema with form --> 

```
 npm i @hookform/resolvers
 import { zodResolver } from '@hookform/resolvers/zod';
```

code --> 

```jsx

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


```

