import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAuthState, IUser} from 'store/slices/auth/types';

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogin: (state, action: PayloadAction<IUser>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    onLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const {onLogin, onLogout} = authSlice.actions;
export default authSlice.reducer;
