import bookSearchResultReducer from "./slices/book-search-result.slice";
import {
  AsyncThunk,
  AsyncThunkOptions,
  AsyncThunkPayloadCreator,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { initialReduxState } from "./models";

let store: ReturnType<typeof createStore>;

const createStore = (preloadedState: any) => {
  return configureStore({
    preloadedState: preloadedState ?? initialReduxState,
    reducer: {
      bookSearchResult: bookSearchResultReducer,
    },
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

  // create a new store for SSG and SSR
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
};
// Using this we get correctly typed thunks
export const createAppAsyncThunk = <Returned extends any, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<
    Returned,
    ThunkArg,
    AsyncThunkConfig
  >,
  options?: AsyncThunkOptions<ThunkArg, AsyncThunkConfig>
): AsyncThunk<Returned, ThunkArg, AsyncThunkConfig> =>
  createAsyncThunk<Returned, ThunkArg>(typePrefix, payloadCreator, options);
