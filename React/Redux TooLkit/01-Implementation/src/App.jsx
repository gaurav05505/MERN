import React, { useState } from 'react'
import { incr , dec , incByValue , SetZero ,decByValue  } from './Redux/Features/CounterSlice'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  const data = useSelector((state => state.counter.value))

  const [num , setNum] = useState();


  return (
    <div className='all'>
      <h1>{data}</h1>
      <div className='btn'>

        <button onClick={()=>{
          dispatch(dec())
        }} >Dec</button>

        <button onClick={()=>{
          dispatch(incr())
        }} >Incr</button>

        <button onClick={()=>{
          dispatch(decByValue(Number(num)))
        }} >dec By Value</button>

        <button onClick={()=>{
          dispatch(incByValue(Number(num)))
        }} >Incr By Value</button>

        <button onClick={()=>{
          dispatch(SetZero())
        }} >Set to 0 </button>

      </div>

      <input type="Number"
      value={num}
       onChange={(e)=>{
        setNum(e.target.value);
        
      }} />

    </div>
  )
}

export default App
