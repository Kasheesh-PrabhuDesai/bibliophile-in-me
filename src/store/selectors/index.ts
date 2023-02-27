import { TypedUseSelectorHook, useSelector } from "react-redux";
import ReduxState from "../models";

export const useReduxSelector: TypedUseSelectorHook<ReduxState> = useSelector;
