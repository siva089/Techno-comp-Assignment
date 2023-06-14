import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import thunkMiddleware from 'redux-thunk';

const store = configureStore({
  reducer: {
    tasks: taskReducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware)

});

export type RootState = ReturnType<typeof store.getState>;

export default store;
