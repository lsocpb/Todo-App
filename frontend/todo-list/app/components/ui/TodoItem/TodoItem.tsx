"use client";
import { useState } from "react";
import { Todo, UpdateTodoDto } from "../../../services/todoService";
import EditTodoForm from "../../forms/EditTodoForm";
import { Icons } from "../../../assets/Icons";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updateData: UpdateTodoDto) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

/**
 * Komponent reprezentujący pojedyncze zadanie Todo, umożliwiający edytowanie, usuwanie oraz oznaczanie zadania jako zakończone.
 *
 * @component
 * @param {TodoItemProps} props - Właściwości komponentu.
 * @param {Todo} props.todo - Zadanie Todo, które ma być wyświetlone.
 * @param {(id: string, updateData: UpdateTodoDto) => Promise<void>} props.onUpdate - Funkcja obsługująca aktualizację zadania Todo.
 * @param {(id: string) => Promise<void>} props.onDelete - Funkcja obsługująca usuwanie zadania Todo.
 *
 * @example
 * <TodoItem
 *   todo={todoData}
 *   onUpdate={handleUpdateTodo}
 *   onDelete={handleDeleteTodo}
 * />
 */
export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  /**
   * Obsługuje zmianę statusu zakończenia zadania.
   * @returns {Promise<void>}
   * @throws {Error} Błąd podczas zmiany statusu zakończenia zadania.
   */
  const toggleComplete = async () => {
    setIsLoading(true);
    try {
      await onUpdate(todo.id, { isCompleted: !todo.isCompleted });
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Pokazuje potwierdzenie usunięcia zadania.
   */
  const promptDelete = () => {
    setShowDeleteConfirmation(true);
  };

  /**
   * Ukrywa potwierdzenie usunięcia zadania.
   */
  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  /**
   * Obsługuje usunięcie zadania.
   * @returns {Promise<void>}
   * @throws {Error} Błąd podczas usuwania zadania.
   */
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      setIsLoading(true);
      try {
        await onDelete(todo.id);
        setShowDeleteConfirmation(false);
      } catch (error: any) {
        setError(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 mb-3 shadow-sm transition-all ${
        todo.isCompleted ? "bg-gray-50" : "bg-white"
      }`}
    >
      {isEditing ? (
        <EditTodoForm
          todo={todo}
          onUpdate={onUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleComplete}
                disabled={isLoading}
                className={`h-5 w-5 rounded border flex items-center justify-center ${
                  todo.isCompleted
                    ? "bg-green-500 border-green-600 text-white"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                aria-label="Toggle complete"
              >
                {todo.isCompleted && <Icons.Check />}
              </button>
              <div
                className={`flex-grow ${
                  todo.isCompleted ? "text-gray-500 line-through" : ""
                }`}
              >
                <h3 className="font-medium">{todo.title}</h3>
                {todo.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {todo.description}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Created: {new Date(todo.createdAt).toLocaleDateString()}
                  {todo.updatedAt &&
                    `, Updated: ${new Date(
                      todo.updatedAt
                    ).toLocaleDateString()}`}
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-700 p-1"
                disabled={isLoading}
                aria-label="Edit todo"
              >
                <Icons.Edit />
              </button>
              <button
                onClick={promptDelete}
                className="text-red-500 hover:text-red-700 p-1"
                disabled={isLoading || showDeleteConfirmation}
              >
                <Icons.Delete />
              </button>
            </div>
          </div>

          {showDeleteConfirmation && (
            <div className="mt-3 border-t pt-3 flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Are you sure you want to delete this todo?
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={cancelDelete}
                  className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded text-gray-800 transition-colors"
                  disabled={isLoading}
                  aria-label="Cancel delete"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 rounded text-white transition-colors flex items-center"
                  disabled={isLoading}
                  aria-label="Delete todo"
                >
                  {isLoading ? (
                    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></span>
                  ) : null}
                  Delete
                </button>
              </div>
            </div>
          )}

          {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
        </>
      )}
    </div>
  );
}
