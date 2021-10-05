import { FetchTodoAction, DeleteTodoAction } from ".";

export enum ActionTypes {
  fetchTodos,
  deleteTodo
}

export type Action = FetchTodoAction | DeleteTodoAction