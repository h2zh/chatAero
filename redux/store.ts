import {configureStore} from '@reduxjs/toolkit';
import userInputReducer from './reducers/userInput';
import convoReducer from './reducers/convo';
import acctDataReducer from './reducers/acctData';

export default configureStore({
    reducer: {
        userInput: userInputReducer,
        convo: convoReducer,
        acctData: acctDataReducer,
    }
});
