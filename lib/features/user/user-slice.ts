import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn(
      state,
      action: { type: string; payload: { email: string; role: string } },
    ) {
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    signOut() {
      return initialState;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
