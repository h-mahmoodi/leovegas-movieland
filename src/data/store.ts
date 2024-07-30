import { configureStore } from '@reduxjs/toolkit';

import appSliceReducer from './appSlice';
import moviesSliceReducer from './moviesSlice';
import starredSliceReducer from './starredSlice';
import watchLaterSliceReducer from './watchLaterSlice';

const store = configureStore({
  reducer: {
    app: appSliceReducer,
    movies: moviesSliceReducer,
    starred: starredSliceReducer,
    watchLater: watchLaterSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
