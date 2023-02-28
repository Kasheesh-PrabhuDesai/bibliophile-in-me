import bookSearchResultReducer from "./slices/book-search-result.slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { initialReduxState } from "./models";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  reconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  bookSearchResult: bookSearchResultReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store: ReturnType<typeof createStore>;

const createStore = (preloadedState: any) => {
  return configureStore({
    preloadedState: preloadedState ?? initialReduxState,
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export const initStore = (preloadedState?: any) => {
  let _store = store ?? createStore(preloadedState);
  if (preloadedState && store) {
    _store = createStore({
      ...store.getState(),
      ...preloadedState,
    });
  }

  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};
export const persistor = persistStore(initStore());

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
