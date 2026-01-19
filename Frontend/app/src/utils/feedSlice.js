import {createSlice} from "@reduxjs/toolkit"
const feedSLice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>  action.payload,
        removeUserFeed:(state,action)=>{
            const newFeed=state.filter(user=>user._id!==action.payload)
            return newFeed;
        },
    },
});
export const{addFeed,removeUserFeed}=feedSLice.actions;
export default feedSLice.reducer;