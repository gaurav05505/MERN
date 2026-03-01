import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './features/searchSlice'
import collectionReducer from './features/collectionSlice'

export const store = configureStore({
    reducer:{
        Search: searchReducer, 
        Collections: collectionReducer 
    }
})