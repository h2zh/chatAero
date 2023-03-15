import {createSlice,PayloadAction} from '@reduxjs/toolkit';

interface Conversation {
    role: string;
    content: string;
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
    convosNOTAM: [{"role": "system", "content": "Please precisely translates the following NOTAM to plain English. Do not write explanations. Use UTC."}],
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