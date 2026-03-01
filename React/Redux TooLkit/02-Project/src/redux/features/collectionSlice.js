import { createSlice } from "@reduxjs/toolkit";
import { Slide, toast } from "react-toastify";


const initialState = {
    items: JSON.parse(localStorage.getItem("collection")) || []
} 


const CollectionSlice = createSlice({
    name:"Collections", 
    initialState, 
    reducers:{
        addCollection : (state , action )=>{

            const alreadyExist = state.items.find(
                item => item.id === action.payload.id 
            )

            if(!alreadyExist){
                state.items.push(action.payload)
                localStorage.setItem('collection' , JSON.stringify(state.items))
                
            }

        },

        removeCollection : (state , action )=>{
            state.items = state.items.filter(
                item => item.id != action.payload
            )

            localStorage.setItem('collection' , JSON.stringify(state.items))
        },

        clearCollection : (state )=>{
            state.items = []
            localStorage.removeItem('collection')
        }, 

        addedTost: ()=>{
            toast.success('Added To Collection!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
                });
        },

        RemoveTost: ()=>{
            toast.error('Item has been removed from Collection!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
                });
        },

        ClearTost: ()=>{
            toast.error('All Item has been removed from Collection!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
                });
        },

        NoTost: ()=>{
            toast.warning('There Is No Item In Collection , Add Items', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
                });
        }
    }
}); 

export const  {addCollection , removeCollection , NoTost , ClearTost ,  RemoveTost , addedTost , clearCollection} = CollectionSlice.actions; 

export default CollectionSlice.reducer; 
