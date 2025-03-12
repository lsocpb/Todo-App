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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5020";

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
    const response = await api.get<Todo[]>("/api/Todo");
    return response.data;
  }

  /**
   * Pobiera zadanie Todo na podstawie identyfikatora.
   * @param {string} id - Identyfikator zadania.
   * @returns {Promise<Todo>} Zadanie Todo.
   * @throws {Error} Błąd podczas pobierania zadania.
   */
  static async getTodoById(id: string): Promise<Todo> {
    const response = await api.get<Todo>(`/api/Todo/${id}`);
    return response.data;
  }

  /**
   * Tworzy nowe zadanie Todo.
   * @param {CreateTodoDto} createTodoDto - Dane do utworzenia zadania.
   * @returns {Promise<Todo>} Utworzone zadanie Todo.
   * @throws {Error} Błąd podczas tworzenia zadania.
   */
  static async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const response = await api.post<Todo>("/api/Todo", createTodoDto);
    return response.data;
  }

  /**
   * Aktualizuje istniejące zadanie Todo.
   * @param {string} id - Identyfikator zadania do aktualizacji.
   * @param {UpdateTodoDto} updateTodoDto - Dane do aktualizacji zadania.
   * @returns {Promise<any>} Odpowiedź z serwera po aktualizacji zadania.
   * @throws {Error} Błąd podczas aktualizacji zadania.
   */
  static async updateTodo(
    id: string,
    updateTodoDto: UpdateTodoDto
  ): Promise<any> {
    const response = await api.put(`/api/Todo/${id}`, updateTodoDto);
    return response.data;
  }

  /**
   * Usuwa zadanie Todo na podstawie identyfikatora.
   * @param {string} id - Identyfikator zadania do usunięcia.
   * @returns {Promise<any>} Odpowiedź z serwera po usunięciu zadania.
   * @throws {Error} Błąd podczas usuwania zadania.
   */
  static async deleteTodo(id: string): Promise<any> {
    const response = await api.delete(`/api/Todo/${id}`);
    return response.data;
  }
}

export default TodoService;
