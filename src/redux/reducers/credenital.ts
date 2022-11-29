import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  credentialPostGet,
  setLocalCredential,
  setRights,
} from "../../api/credenitalWorker";
import { ICredentialState } from "../../types/ICredentialState";
import { IUser } from "../../types/IUser";

const initialState: ICredentialState = {
  name: "",
  rights: setRights(),
  error: false,
  loading: false,
};

const credenitalsSlice = createSlice({
  name: "credenitals",
  initialState,
  reducers: {
    logOut: function (state: ICredentialState) {
      state.name = "";
      setLocalCredential();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        credentialPostGet.fulfilled,
        function (state: ICredentialState, action: PayloadAction<IUser>) {
          state.loading = false;
          state.name = action.payload.name;
          state.rights = setRights(action.payload.role);
        }
      )
      .addCase(credentialPostGet.rejected, function (state: ICredentialState) {
        state.loading = false;
        state.error = true;
      })
      .addCase(credentialPostGet.pending, function (state: ICredentialState) {
        state.loading = true;
      });
  },
});

const credenitalsReducer = credenitalsSlice.reducer;
export const { logOut } = credenitalsSlice.actions;
export default credenitalsReducer;
