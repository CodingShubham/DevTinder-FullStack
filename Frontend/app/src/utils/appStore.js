import{configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionsReducer from "./connectionsSlice"
import requestssReducer from "./requestsSlice"

const appStore=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connections:connectionsReducer,
        requests:requestssReducer
    },
});

export default appStore;