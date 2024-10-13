import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './features/Todo/todoSlice';
import userApi from './features/ApiSlice/apiSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,

    // API
    [userApi.reducerPath]: userApi.reducer,
  },

  // MiddleWare
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;