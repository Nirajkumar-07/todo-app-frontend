import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUserImage: (state, action) => {
      state.user.image = action.payload;
    },
  },
});

export const { setUser, updateUserImage } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
