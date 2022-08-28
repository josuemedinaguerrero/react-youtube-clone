import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../types/types";

export interface CounterState {
   currentUser: UserModel;
   loading: boolean;
   error: boolean;
}

const initialState: CounterState = {
   currentUser: {} as UserModel,
   error: false,
   loading: false,
};

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      loginStart: (state) => {
         state.loading = true;
         state.error = false;
      },
      loginSuccess: (state, action: PayloadAction<UserModel>) => {
         state.loading = false;
         state.currentUser = action.payload;
      },
      loginFailure: (state) => {
         state.loading = false;
         state.error = true;
      },
      logout: (state) => {
         state.currentUser = {} as UserModel;
         state.error = false;
         state.loading = false;
      },
      subscription: (state, action: PayloadAction<string>) => {
         if (state.currentUser.subscribedUsers.includes(action.payload)) {
            state.currentUser.subscribedUsers.splice(
               state.currentUser.subscribedUsers.findIndex(
                  (channelId) => channelId === action.payload
               ),
               1
            );
         } else {
            state.currentUser.subscribedUsers.push(action.payload);
         }
      },
   },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription } = userSlice.actions;
export default userSlice.reducer;
