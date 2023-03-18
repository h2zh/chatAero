import {createSlice} from '@reduxjs/toolkit';
import { userAgent } from 'next/server';


const acctDataSlice = createSlice({
    name: 'acctData',
    initialState: {
        username: null,
        userEmail: null, 
        usageCount: 0,
        isLoginPopupOpen: true,
    },
    reducers: {
        setActiveUser: (state, action) => {
            state.username = action.payload.username;
            state.userEmail = action.payload.userEmail;
        },
        setUsageCount: (state, action) => {
            state.usageCount += action.payload;
        },
        setUserLogOut: (state) => {
            state.username = null;
            state.userEmail = null;
        },
        setIsLoginPopupOpen: (state, action) => {
            state.isLoginPopupOpen = action.payload;
        }
    }
});

export const {setActiveUser, setUsageCount, setUserLogOut, setIsLoginPopupOpen} = acctDataSlice.actions;
export default acctDataSlice.reducer;