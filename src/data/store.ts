import { configureStore } from '@reduxjs/toolkit';

import moviesSliceReducer from './moviesSlice';
import starredSliceReducer from './starredSlice';
import watchLaterSliceReducer from './watchLaterSlice';

const store = configureStore({
  reducer: {
    movies: moviesSliceReducer,
    starred: starredSliceReducer,
    watchLater: watchLaterSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
