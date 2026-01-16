import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: [],   // ✅ ALWAYS ARRAY
  reducers: {
    addConnections: (state, action) => {
      return action.payload; // ✅ MUST be array
    },
    removeConnections: () => {
      return [];
    },
  },
});

export const { addConnections, removeConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer;
