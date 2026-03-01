import { createSlice } from "@reduxjs/toolkit";


const search = createSlice({
    name: 'search', 
    initialState:{
        query: "", 
        activeTab:'Photos', 
        results: [], 
        loading: false, 
        error:null,
    },

    reducers: {
        setQuery(state , action){
            state.query = action.payload
        },
        setActiveTab(state , action){
            state.activeTab = action.payload
        },
        setResult(state , action){
            state.results = action.payload
            state.loading= false 
        },
        setLoading(state ){
            state.loading=true
            state.error = null 

        },
        setError(state , action){
            state.error = action.payload
            state.loading= false
        },
    }
})

export const {setQuery , setActiveTab , setResult , setLoading , setError} = search.actions 
export default search.reducer; 