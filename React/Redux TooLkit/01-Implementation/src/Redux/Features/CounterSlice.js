import { createSlice } from "@reduxjs/toolkit";


export const counterSlice = createSlice({
    name: "counter", 
    initialState: {
        value: 10 
    },
    reducers:{
        incr: (state)=> {
            state.value++
        },

        dec: (state) =>{
            state.value--
        },

        incByValue: (state , actions)=>{
            state.value += actions.payload
        },

        decByValue: (state , actions)=>{
            state.value -= actions.payload
        },

        SetZero: (state)=>{
            state.value = 0 
        }
    }
})

export const {incr , dec ,incByValue , SetZero , decByValue } = counterSlice.actions; 
export default counterSlice.reducer;