import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import {
  legacy_createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from "redux";

import thunk from "redux-thunk";
import { reducer as jobReducer } from "./job/job.reducer";

const root = combineReducers({
  jobReducer,
});

const store = legacy_createStore(root, compose(applyMiddleware(thunk)));

export { store };

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// type DispatchFunc = () => AppDispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
