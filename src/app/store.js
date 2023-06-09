import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from "../features/api/apiSlice";
import projectsSliceReducer from "../features/projects/projectsSlice";


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        projects: projectsSliceReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware)
});
