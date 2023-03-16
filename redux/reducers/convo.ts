import {createSlice,PayloadAction} from '@reduxjs/toolkit';

export interface Conversation {
    role: string;
    content: string;
    time: number;
}

interface Conversations {
    convosNOTAM: Conversation[];
}
interface Conversations {
    convosMETAR: Conversation[];
}
interface Conversations {
    convosTAF: Conversation[];
}
interface Conversations {
    convosAFTN: Conversation[];
}
interface Conversations {
    convosSITA: Conversation[];
}

const initialState: Conversations = {
    convosNOTAM: [],
    convosMETAR: [],
    convosTAF: [],
    convosAFTN: [],
    convosSITA: [],
}

const convoSlice = createSlice({
    name: 'convo',
    initialState,
    reducers: {
        concatNOTAMconvos: (state, action: PayloadAction<Conversation>) => {
            state.convosNOTAM.push(action.payload);
        },
        concatMETARconvos: (state, action: PayloadAction<Conversation>) => {
            state.convosMETAR.push(action.payload);
        },
        concatTAFconvos: (state, action: PayloadAction<Conversation>) => {
            state.convosTAF.push(action.payload);
        },
        popNOTAMconvos: (state) => {
            state.convosNOTAM.pop();
        },
        concatAFTNconvos: (state, action: PayloadAction<Conversation>) => {
            state.convosAFTN.push(action.payload);
        },
        concatSITAconvos: (state, action: PayloadAction<Conversation>) => {
            state.convosSITA.push(action.payload);
        },
    },
});

export const {concatNOTAMconvos, concatMETARconvos, concatTAFconvos, popNOTAMconvos, concatAFTNconvos, concatSITAconvos} = convoSlice.actions;
export default convoSlice.reducer;