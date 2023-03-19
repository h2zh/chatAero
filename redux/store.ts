import {configureStore} from '@reduxjs/toolkit';
import userInputReducer from './reducers/userInput';
import convoReducer from './reducers/convo';
import acctDataReducer from './reducers/acctData';

const store = configureStore({
    reducer: {
        userInput: userInputReducer,
        convo: convoReducer,
        acctData: acctDataReducer,
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;