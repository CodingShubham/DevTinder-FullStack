import {createSlice} from "@reduxjs/toolkit"
const feedSLice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>  action.payload,
        removeFeed:(state,action)=>null,
    },
});
export const{addFeed,removeFeed}=feedSLice.actions;
export default feedSLice.reducer;