import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import todo from "./todo";

const rootReducer = combineReducers({
  todo: todo.reducer,
});

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  }
  return rootReducer(state, action);
};

// store 타입
export type RootState = ReturnType<typeof rootReducer>;

const initStore = () => {
  return configureStore({
    reducer,
    devTools: true,
  });
};

//app 컴포넌트에서 wrapper로 활용하기 위한 선언
export const wrapper = createWrapper(initStore);

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
