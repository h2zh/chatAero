import {createSlice} from '@reduxjs/toolkit';


const userInputSlice = createSlice({
    name: 'userInput',
    initialState: {
        METAR: '', 
        TAF: "", 
        NOTAM: "",
        NOTAMloading: false,
    },
    reducers: {
        setMETAR: (state, action) => {
            state.METAR = action.payload;
        },
        setTAF: (state, action) => {
            state.TAF = action.payload;
        },
        setNOTAM: (state, action) => {
            state.NOTAM = action.payload;
        },
        setNOTAMLoading: (state, action) => {
            state.NOTAMloading = action.payload;
        }
    }
});

export const {setMETAR, setTAF, setNOTAM, setNOTAMLoading} = userInputSlice.actions;
export default userInputSlice.reducer;