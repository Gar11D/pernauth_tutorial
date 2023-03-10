import { createSlice } from '@reduxjs/toolkit';
import { json } from 'react-router-dom';

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem('isAuth');

  if(isAuth && JSON.parse(isAuth) === true) {
    return true
  }

  return false;

}

const initialState = { 
    isAuth: userAuthFromLocalStorage(), 
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state) => {
        state.isAuth = true
    },
    unauthenticateUser: (state) => {
        state.isAuth = false
    }
  },
})

export const {authenticateUser, unauthenticateUser } = authSlice.actions;
export default authSlice.reducer;