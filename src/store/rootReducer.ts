import {combineReducers} from '@reduxjs/toolkit';
import authSlice from 'store/slices/auth/authSlice';
import {SLICES} from 'types/store';

const rootReducer = combineReducers({
  [SLICES.AUTH]: authSlice,
});

export default rootReducer;
