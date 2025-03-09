import axios from "axios";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  isCompleted?: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export class TodoService {
  static async getAllTodos(): Promise<Todo[]> {
    try {
      const response = await api.get<Todo[]>("/api/Todo");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch todos:", error);
      throw error;
    }
  }

  static async getTodoById(id: string): Promise<Todo> {
    try {
      const response = await api.get<Todo>(`/api/Todo/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch todo ${id}:`, error);
      throw error;
    }
  }

  static async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const response = await api.post<Todo>("/api/Todo", createTodoDto);
      return response.data;
    } catch (error) {
      console.error("Failed to create todo:", error);
      throw error;
    }
  }

  static async updateTodo(
    id: string,
    updateTodoDto: UpdateTodoDto
  ): Promise<boolean> {
    try {
      await api.put(`/api/Todo/${id}`, updateTodoDto);
      return true;
    } catch (error) {
      console.error(`Failed to update todo ${id}:`, error);
      throw error;
    }
  }

  static async deleteTodo(id: string): Promise<boolean> {
    try {
      await api.delete(`/api/Todo/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete todo ${id}:`, error);
      throw error;
    }
  }
}

export default TodoService;
