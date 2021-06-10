import { TodoType } from "types/todo";
import api from "./index";

interface AddTodoBody {
  text: string;
  color: TodoType["color"];
}

export const getTodoAPI = () => api.get<TodoType[]>("/api/todos");

export const checkTodoAPI = (id: number) => api.patch(`/api/todos/${id}`);

export const addTodoAPI = (body: AddTodoBody) => api.post("/api/todos", body);

export const deleteTodoAPI = (id: number) => api.delete(`/api/todos/${id}`);
