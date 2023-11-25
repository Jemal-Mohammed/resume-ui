import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import { act } from 'react-dom/test-utils';
const storedUser = localStorage.getItem('user');
const user = storedUser ? JSON.parse(storedUser) : null;

export interface User {
  name: string;
  email: string;
  password: string;
}
export interface LoginUser {
  email: string;
  password: string;
}

export interface UserState {
  user: User | null;
  loginUser:LoginUser |null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: UserState = {
  user: null,
  loginUser:user,
  loading: false,
  error: null,
  message: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerStart: (state, action: PayloadAction<User>) => {
        console.log(action.payload);
        state.loading = true;
        state.user =  action.payload;
        // return{
        //     ...state,
        //     loading:true,
        //     error:null,
        //     message:null
        // }
    },
    registerSuccess(state, action: PayloadAction<User>) {
        state.loading = false;
        state.error="";
        state.user =  action.payload;
        state.message="You have registered Successfully";
      },
      registergFailure(state, action: PayloadAction<string>) {
        state.loading = false;
        state.error = action.payload;
      },
      loginStart: (state, action: PayloadAction<LoginUser>) => {
        console.log(action.payload);
        state.loading = true;
        state.loginUser =  action.payload;
      },
      loginSuccess: (state, action: PayloadAction<LoginUser>) => {
        console.log(action.payload);
        localStorage.setItem('user', JSON.stringify(action.payload));
        state.error=null,
        state.loading=false,
        state.loginUser=action.payload,
        state.message="loged in successfully!!"
        // return{
        //   ...state,
        //   loading:false,
        //   error:null,
        //   message:"login seccussful!"
        // }
 
      },
    loginFailer: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutStart: (state) => {
      state.loading=true;
      // console.log(action.payload);
        // return{
        //     ...state,
        //     loading:true,
        //     error:null,
        //     message:null
        // }
    },
    logoutSuccess: (state,action:PayloadAction<LoginUser>) => {
      console.log(action.payload);
      state.loading=false,
      state.loginUser=null,
      state.error=null,
      state.message="loged out seccussful!"
      // return{
      //   ...state,
      //   loading:false,
      //   error:null,
      //   message:"loged out seccussful!",
      //   }
    },
    logoutFailer: (state) => {
      state.loading = false;
      state.error = null;
      state.message=""
    },
  
    fetchStart: (state) => {
      // console.log(action.payload);
        return{
            ...state,
            loading:true,
            error:null,
            message:null
        }
    },
    fetchSuccess: (state,action:PayloadAction<LoginUser>) => {
      state.error=null,
      state.loading=false,
      state.loginUser=action.payload
      // state.message="Fetched seccussful!"
      // console.log(action.payload);
        // return{
        //     ...state,
        //     loading:false,
        //     error:null,
        //     message:"Fetched seccussful!"
        // }
    },
    fetchFailer: (state) => {
      state.loading = false;
      state.error = "something went wrong";
      state.message=""
    },
  },
});

// Action creators are generated for each case reducer function
export const {
     registerStart,
     registerSuccess,
     registergFailure,

      loginStart,
      loginSuccess,
      loginFailer,
       
      logoutStart,
      logoutSuccess,
      logoutFailer,

      fetchStart,
      fetchSuccess,
      fetchFailer
    } = userSlice.actions;

export default userSlice.reducer;
