import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import { act } from 'react-dom/test-utils';

export interface Profile {
  phone: string;
  address: string;
  certification: string;
  experience:string;
  skills:string;
  personalIntersets:string;
  onlineProfiles:string;
  references:string;
  education:string;
  language:string,
  courses:string
  birthDate:Date;
  gender:string;
  file:File |null;
}
export interface ProfileState{
   profile:Profile | null,
   loading:boolean,
   message:string |null,
   error:string|null
}
const initialState: ProfileState = {
  profile:null,
  loading:false,
  message:null,
  error:null  
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileCompleteStart: (state, action: PayloadAction<Profile>) => {
        console.log(action.payload);
        return{
            ...state,
            loading:true,
            error:null,
            message:null
        }
    },
    profileCompleteSuccess(state, action: PayloadAction<Profile>) {
        state.loading = false;
        state.error="";
        state.profile =  action.payload;
        state.message="You have completed your profile Successfully";
        
      },
      profileCompleteFailure(state, action: PayloadAction<string>) {
        state.loading = false;
        state.error = action.payload;
      },
      profileDownloadStart: (state) => {
        return{
            ...state,
            loading:true,
            error:null,
            message:null
        }
    },
    profileDownloadSuccess(state,action:PayloadAction<Blob>) {
         console.log(action.payload);
         
        state.loading = false;
        state.error="";
        // state.profile =  action.payload;
        state.message="You have downloaded your cv Successfully";
        
      },
      profileDownloadFailure(state, action: PayloadAction<string>) {
        state.loading = false;
        state.error = action.payload;
      },
  },
});

// Action creators are generated for each case reducer function
export const {
    profileCompleteStart,
    profileCompleteSuccess,
    profileCompleteFailure,
    profileDownloadStart,
    profileDownloadSuccess,
    profileDownloadFailure
    } = profileSlice.actions;

export default profileSlice.reducer;
