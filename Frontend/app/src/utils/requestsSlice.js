import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: [],   // ✅ ALWAYS ARRAY
  reducers: {
    addRequests: (state, action) => {
      return action.payload; // ✅ MUST be array
    },

  },
});

export const {addRequests  } = requestsSlice.actions;
export default requestsSlice.reducer;
