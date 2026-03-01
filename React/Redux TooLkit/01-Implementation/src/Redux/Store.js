import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Features/CounterSlice";

export const store = configureStore({
    reducer:{
        counter: counterReducer
    }
})