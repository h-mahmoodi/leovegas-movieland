/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import moviesSlice from '../data/moviesSlice';
import starredSlice from '../data/starredSlice';
import watchLaterSlice from '../data/watchLaterSlice';
import appSlice from '../data/appSlice';
import { RootState } from '../data/store';

interface RenderWithProvidersOptions extends RenderOptions {
  preloadedState?: Partial<RootState>;
  store?: EnhancedStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        movies: moviesSlice.reducer,
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer,
        app: appSlice.reducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: RenderWithProvidersOptions = {}
) {
  setupListeners(store.dispatch);

  interface WrapperProps {
    children: React.ReactNode;
  }

  function Wrapper({ children }: WrapperProps) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
