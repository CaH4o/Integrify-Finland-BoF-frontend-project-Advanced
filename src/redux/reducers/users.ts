import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../../types/IUser";
import { IUserState } from "../../types/IUserState";
import { usersGet } from "../../api/usersWorker";

const initialState: IUserState = {
  currentUser: undefined,
  users: [],
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setCurrentUser: function (state: IUserState, action: PayloadAction<IUser>) {
      state.currentUser = action.payload;   
    },
  },
  extraReducers: function (build) {
    build.addCase(
      usersGet.fulfilled,
      function (state: IUserState, action: PayloadAction<IUser[]>) {
        state.users = action.payload;
      }
    );
  },
});

export default userSlice.reducer;
export const {} = userSlice.actions;
