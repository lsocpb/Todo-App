"use client";
import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";
import TodoService, {
  Todo,
  CreateTodoDto,
  UpdateTodoDto,
} from "../services/todoService";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await TodoService.getAllTodos();
      setTodos(data);
    } catch (err) {
      setError("Failed to load todos");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddTodo = async (todo: CreateTodoDto) => {
    try {
      const createdTodo = await TodoService.createTodo(todo);
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
      setShowAddForm(false);
      return Promise.resolve();
    } catch (err) {
      setError("Failed to create todo");
      console.error(err);
      return Promise.reject(err);
    }
  };

  const handleUpdateTodo = async (id: string, updateData: UpdateTodoDto) => {
    try {
      await TodoService.updateTodo(id, updateData);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id
            ? { ...todo, ...updateData, updatedAt: new Date() }
            : todo
        )
      );
    } catch (err) {
      setError("Failed to update todo");
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await TodoService.deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo");
      console.error(err);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.isCompleted;
    if (filter === "completed") return todo.isCompleted;
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">My Todo List</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center"
        >
          {showAddForm ? (
            <span>Cancel</span>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add Todo</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showAddForm && (
        <AddTodoForm
          onAddTodo={handleAddTodo}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="flex mb-4 space-x-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-md text-sm ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1 rounded-md text-sm ${
            filter === "active"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded-md text-sm ${
            filter === "completed"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Completed
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              {filter === "all"
                ? "No todos yet. Add one to get started!"
                : filter === "active"
                ? "No active todos!"
                : "No completed todos!"}
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
              />
            ))
          )}
        </div>
      )}

      {todos.length > 0 && (
        <div className="mt-5 text-sm text-gray-500">
          {todos.filter((t) => !t.isCompleted).length} items left
        </div>
      )}
    </div>
  );
}
