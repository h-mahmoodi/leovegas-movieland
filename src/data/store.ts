import { configureStore } from '@reduxjs/toolkit';

import moviesSliceReducer from './moviesSlice/moviesSlice';
import starredSliceReducer from './starredSlice/starredSlice';
import watchLaterSliceReducer from './watchLaterSlice/watchLaterSlice';

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
