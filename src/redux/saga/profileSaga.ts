import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { profileCompleteFailure, profileCompleteStart, profileCompleteSuccess, profileDownloadStart, profileDownloadSuccess } from '../slices/profileSlice';

export interface Profile {
  phone: string;
  address: string;
  certification: string;
  exprience: string;
  skills: string;
  personal_interests: string;
  online_profiles: string;
  reference: string;
  education: string;
  language: string,
  courses: string
  birth_date: Date;
  gender: string;
  file: File | null;
}
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* completeProfile(action: PayloadAction<Profile>) {

  try {
    const { file, ...rest } = action.payload;

    const formData = new FormData();

    // Append file if it is truthy and has a size greater than 

    // Append other data
    Object.entries(rest).forEach(([key, value]) => {
      // Convert Date to string before appending
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else {
        formData.append(key, value);
      }
    });
    if (file && file.size > 0) {
      console.log(file.name);
      formData.append('file', file);
    }

    // Now, you can use formData to send the request

    const response: AxiosResponse = yield call(axios.post, 'https://resume-builder-kwcs.onrender.com/complete-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    yield put(profileCompleteSuccess(response.data));
  } catch (error: any) {
    console.error('postUserSaga - Error:', error.response.data);
    yield put(profileCompleteFailure(error.response.data));
  }
}
function* download() {
  try {
    const response: AxiosResponse<Blob> = yield call(axios.get, 'https://resume-builder-kwcs.onrender.com/download', {
      responseType: 'blob',
      withCredentials: true,
    });

    // Assuming you want to create a link to download the file
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'your cv.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // localStorage.removeItem("user")
    yield put(profileDownloadSuccess(response.data));
  } catch (error: any) {
    console.error('download - Error:', error);
    yield put(profileCompleteFailure(error.response.data));
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* profileSaga() {
  yield takeLatest(profileCompleteStart.type, completeProfile)
  yield takeEvery(profileDownloadStart.type, download)

}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/


export default profileSaga