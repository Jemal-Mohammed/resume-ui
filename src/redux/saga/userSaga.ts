import { call, put, takeLatest,takeEvery } from 'redux-saga/effects'
import { LoginUser, fetchFailer, fetchStart, fetchSuccess, loginFailer, loginStart, loginSuccess, logoutFailer, logoutStart, logoutSuccess, registerStart, registerSuccess, registergFailure } from '../slices/userSlice'
import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
export interface User {
    name: string;
    email: string;
    password: string;
  }
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* register(action:PayloadAction<User>) {
    try {
      
        const response: AxiosResponse = yield call(axios.post, 'https://resume-builder-8dkx.onrender.com/register', action.payload,{
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });
        yield put(registerSuccess(response.data));
      } catch (error: any) {
        console.error('postUserSaga - Error:', error.response.data);
        yield put(registergFailure(error.response.data));
      }
}
function* login(action: PayloadAction<LoginUser>) {
  try {
    const response: AxiosResponse = yield call(axios.post, 'https://resume-builder-8dkx.onrender.com/login', action.payload, {
      withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
    });
    yield put(loginSuccess(response.data));
  } catch (error: any) {
    console.error('postUserSaga - Error:', error.response.data.error);
    yield put(loginFailer(error.response.data.error));
  }
}

function* logout() {
  try {
    const response: AxiosResponse = yield call(axios.get, 'https://resume-builder-8dkx.onrender.com/logout',{
      withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
    });
    localStorage.removeItem("user")
    yield put(logoutSuccess(response.data));
  } catch (error: any) {
    console.error('postUserSaga - Error:', error.response.data.errorMessage);
    yield put(logoutFailer(error.response.data.errorMessage));
  }
}
  function* getUser() {
    try {
      // Retrieve data from localStorage using the key 'user'
      const userDataString = localStorage.getItem('user');
  
      // Check if data is available
      if (userDataString !== null) {
        // Parse the data as JSON
        const userData = JSON.parse(userDataString);
  
        // Dispatch a success action with the retrieved data
        yield put(fetchSuccess(userData));
      }  
    } catch (error:any) {
      // Handle errors, e.g., if JSON parsing fails
      console.error('getUser Saga - Error:', error.message);
      yield put(fetchFailer(error.response.data.error));
    }
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* userSaga() {
  yield takeLatest(registerStart.type, register)
  yield takeLatest(loginStart.type, login)
  yield takeEvery(logoutStart.type, logout)
  yield takeEvery(fetchStart.type, getUser)

}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
 

export default userSaga