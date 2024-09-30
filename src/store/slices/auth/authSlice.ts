import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAuthDataPayload, IAuthState} from 'store/slices/auth/types';

const initialState: IAuthState = {
  isAuthenticated: false,
  keepAuth: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    selectKeepAuth: state => state.keepAuth,
    selectUser: state => state.user,
  },
  reducers: {
    onLogin: (state, action: PayloadAction<IAuthDataPayload>) => {
      state.isAuthenticated = true;
      state.keepAuth = action.payload.keepAuth;
      state.user = action.payload.user;
    },
    onLogout: () => initialState,
  },
});

export const {onLogin, onLogout} = authSlice.actions;
export const {selectKeepAuth, selectUser} = authSlice.selectors;
export default authSlice.reducer;
