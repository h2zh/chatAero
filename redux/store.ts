import {configureStore} from '@reduxjs/toolkit';
import userInputReducer from './reducers/userInput';
import convoReducer from './reducers/convo';

export default configureStore({
    reducer: {
        userInput: userInputReducer,
        convo: convoReducer
    }
});
