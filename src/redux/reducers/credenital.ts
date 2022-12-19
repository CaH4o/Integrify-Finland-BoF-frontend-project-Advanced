import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../../types/IUser";
import { ICredentialState } from "../../types/ICredentialState";
import {
  credentialPostGet,
  setLocalCredential,
  setRights,
} from "../../api/credenitalWorker";
import { userPut } from "../../api/usersWorker";

const initialState: ICredentialState = {
  user: undefined,
  rights: setRights(""),
  error: false,
  loading: false,
};

const credenitalsSlice = createSlice({
  name: "credenitals",
  initialState,
  reducers: {
    logOut: function (state: ICredentialState) {
      state.user = undefined;
      state.rights = setRights("");
      setLocalCredential();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        credentialPostGet.fulfilled,
        function (state: ICredentialState, action: PayloadAction<IUser>) {
          state.loading = false;
          if (action.payload) {
            state.user = action.payload;
            state.rights = setRights(action.payload.role);
          }
        }
      )
      .addCase(credentialPostGet.rejected, function (state: ICredentialState) {
        state.loading = false;
        state.error = true;
        setLocalCredential();
        console.log("Current user token has expired and cleared");
      })
      .addCase(credentialPostGet.pending, function (state: ICredentialState) {
        state.loading = true;
      });
    builder
      .addCase(
        userPut.fulfilled,
        function (state: ICredentialState, action: PayloadAction<IUser>) {
          state.loading = false;
          if (action.payload) {
            state.user = action.payload;
            state.rights = setRights(action.payload.role);
          }
        }
      )
      .addCase(userPut.rejected, function (state: ICredentialState) {
        state.loading = false;
        state.error = true;
      })
      .addCase(userPut.pending, function (state: ICredentialState) {
        state.loading = true;
      });
  },
});

const credenitalsReducer = credenitalsSlice.reducer;
export const { logOut } = credenitalsSlice.actions;
export default credenitalsReducer;
