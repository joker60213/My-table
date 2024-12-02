// хранилища Redux
import { configureStore } from "@reduxjs/toolkit";
import TableReducer from './TableSlice'


const store = configureStore({
    reducer: {
        posts: TableReducer, //table
    },
});

export default store;