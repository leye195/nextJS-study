import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoType } from "types/todo";

interface ToDoReduxState {
  todos: TodoType[];
}

const initialState: ToDoReduxState = {
  todos: [],
};

const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setToDo(state, action: PayloadAction<TodoType[]>) {
      state.todos = action.payload;
    },
  },
});

export const todoActions = { ...todo.actions };

export default todo;
