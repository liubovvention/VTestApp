import {combineReducers, UnknownAction} from '@reduxjs/toolkit';
import authSlice from 'store/slices/auth/authSlice';
import {SLICES} from 'types/store';

const combinedReducers = combineReducers({
  [SLICES.AUTH]: authSlice,
});

const rootReducer = (state: any, action: UnknownAction) => {
  return combinedReducers(state, action);
};

export default rootReducer;
