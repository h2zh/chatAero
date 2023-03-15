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

const initialState: Conversations = {
    convosNOTAM: [],
    convosMETAR: [],
    convosTAF: [],
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
        }
    },
});

export const {concatNOTAMconvos, concatMETARconvos, concatTAFconvos, popNOTAMconvos} = convoSlice.actions;
export default convoSlice.reducer;