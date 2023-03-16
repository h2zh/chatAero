import {createSlice} from '@reduxjs/toolkit';


const userInputSlice = createSlice({
    name: 'userInput',
    initialState: {
        METAR: '', 
        TAF: "", 
        NOTAM: "",
        AFTN: "",
        SITA: "",
        NOTAMloading: false,
        METARloading: false,
        TAFloading: false,
        AFTNloading: false,
        SITAloading: false,
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
        setAFTN: (state, action) => {
            state.AFTN = action.payload;
        },
        setSITA: (state, action) => {
            state.SITA = action.payload;
        },
        setNOTAMloading: (state, action) => {
            state.NOTAMloading = action.payload;
        },
        setMETARloading: (state, action) => {
            state.METARloading = action.payload;
        },
        setTAFloading: (state, action) => {
            state.TAFloading = action.payload;
        },
        setAFTNloading: (state, action) => {
            state.AFTNloading = action.payload;
        },
        setSITAloading: (state, action) => {
            state.SITAloading = action.payload;
        }
    }
});

export const {setMETAR, setTAF, setNOTAM, setAFTN, setSITA, setNOTAMloading, setMETARloading, setTAFloading, setAFTNloading, setSITAloading} = userInputSlice.actions;
export default userInputSlice.reducer;