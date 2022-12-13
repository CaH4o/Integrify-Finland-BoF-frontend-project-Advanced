import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../../types/IUser";
import { IUserState } from "../../types/IUserState";
import { usersGet } from "../../api/usersWorker";

const initialState: IUserState = {
  users: [],
  loading: false,
  error: false,
};

const usersSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
  extraReducers: function (build) {
    build.addCase(
      usersGet.fulfilled,
      function (state: IUserState, action: PayloadAction<IUser[]>) {
        state.users = action.payload;
      }
    );
  },
});

const usersReducer = usersSlice.reducer;
//export const {} = usersSlice.actions;
export default usersReducer;
