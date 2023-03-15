import {createSlice} from '@reduxjs/toolkit';


const userInputSlice = createSlice({
    name: 'userInput',
    initialState: {
        METAR: '', 
        TAF: "", 
        NOTAM: "",
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
    }
});

export const {setMETAR, setTAF, setNOTAM} = userInputSlice.actions;
export default userInputSlice.reducer;