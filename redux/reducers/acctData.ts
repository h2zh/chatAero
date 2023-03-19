import {createSlice} from '@reduxjs/toolkit';


const acctDataSlice = createSlice({
    name: 'acctData',
    initialState: {
        username: null,
        userEmail: null, 
        authLoading: false,
        usageCount: 0,
        isLoginPopupOpen: true,
        error: null,
    },
    reducers: {
        setActiveUser: (state, action) => {
            state.username = action.payload.username;
            state.userEmail = action.payload.userEmail;
            state.authLoading = false;
        },
        setAuthLoading: (state, action) => {
            state.authLoading = action.payload;
        },
        setError: (state, action) => {
            state.authLoading = false;
            state.error = action.payload;
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

export const {setActiveUser, setUsageCount, setUserLogOut, setIsLoginPopupOpen, setAuthLoading, setError} = acctDataSlice.actions;
export default acctDataSlice.reducer;