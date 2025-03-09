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

/**
 * Serwis do zarządzania zadaniami typu Todo.
 */
export class TodoService {
  /**
   * Pobiera wszystkie zadania Todo.
   * @returns {Promise<Todo[]>} Lista wszystkich zadań Todo.
   * @throws {Error} Błąd podczas pobierania zadań.
   */
  static async getAllTodos(): Promise<Todo[]> {
    try {
      const response = await api.get<Todo[]>("/api/Todo");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch todos:", error);
      throw error;
    }
  }
  /**
   * Pobiera zadanie Todo na podstawie identyfikatora.
   * @param {string} id - Identyfikator zadania.
   * @returns {Promise<Todo>} Zadanie Todo.
   * @throws {Error} Błąd podczas pobierania zadania.
   */
  static async getTodoById(id: string): Promise<Todo> {
    try {
      const response = await api.get<Todo>(`/api/Todo/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch todo ${id}:`, error);
      throw error;
    }
  }
  /**
   * Tworzy nowe zadanie Todo.
   * @param {CreateTodoDto} createTodoDto - Dane do utworzenia zadania.
   * @returns {Promise<Todo>} Utworzone zadanie Todo.
   * @throws {Error} Błąd podczas tworzenia zadania.
   */
  static async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const response = await api.post<Todo>("/api/Todo", createTodoDto);
      return response.data;
    } catch (error) {
      console.error("Failed to create todo:", error);
      throw error;
    }
  }

  /**
   * Aktualizuje istniejące zadanie Todo.
   * @param {string} id - Identyfikator zadania do aktualizacji.
   * @param {UpdateTodoDto} updateTodoDto - Dane do aktualizacji zadania.
   * @returns {Promise<boolean>} True, jeśli aktualizacja się powiodła.
   * @throws {Error} Błąd podczas aktualizacji zadania.
   */
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

  /**
   * Usuwa zadanie Todo na podstawie identyfikatora.
   * @param {string} id - Identyfikator zadania do usunięcia.
   * @returns {Promise<boolean>} True, jeśli usunięcie się powiodło.
   * @throws {Error} Błąd podczas usuwania zadania.
   */
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
