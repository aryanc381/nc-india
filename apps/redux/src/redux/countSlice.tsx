import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
    name: 'Cart',
    initialState: 0,
    reducers: {
        increment: (state) => state + 1,
        decrement: (state) => state - 1
    },
});

export default countSlice.reducer;
export const { increment, decrement } = countSlice.actions;