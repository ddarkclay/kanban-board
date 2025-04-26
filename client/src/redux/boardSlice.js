import { createSlice } from "@reduxjs/toolkit";
import { getBoards } from "../services/board.api";

export const boardSlice = createSlice({
  name: "board",
  initialState: { lists: [] },
  reducers: {},
  extraReducers: (builder) => {
    // Get Orders
    // builder.addCase(getBoards.pending, (state, action) => {
    //   console.log("action : ", action);
    //   // state.isLoading = true;
    // });
    builder.addCase(getBoards.fulfilled, (state, action) => {
      console.log("action : ", action);
      state.lists = Object.values(action.payload);
    });
  },
});

export default boardSlice.reducer;
