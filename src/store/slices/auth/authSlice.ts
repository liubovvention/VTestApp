import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAuthDataPayload, IAuthState} from 'store/slices/auth/types';

const initialState: IAuthState = {
  isAuthenticated: false,
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    selectisLoggedIn: state => state.isLoggedIn,
    selectUser: state => state.user,
  },
  reducers: {
    onLogin: (state, action: PayloadAction<IAuthDataPayload>) => {
      state.isAuthenticated = true;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
    onLogout: () => initialState,
  },
});

export const {onLogin, onLogout} = authSlice.actions;
export const {selectisLoggedIn, selectUser} = authSlice.selectors;
export default authSlice.reducer;
