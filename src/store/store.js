import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {exercisesReducer} from "./exercises";

const rootReducer = combineReducers({
    exercises: exercisesReducer
});

export const store = configureStore({
    reducer: rootReducer
});
