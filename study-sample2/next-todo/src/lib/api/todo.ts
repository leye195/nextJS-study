import { TodoType } from "types/todo";
import api from "./index";

export const getTodoAPI = () => api.get<TodoType[]>("/api/todos");

export const checkTodoAPI = (id: number) => api.patch(`/api/todos/${id}`);
