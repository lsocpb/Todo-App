"use client";
import { useState } from "react";
import { Todo, UpdateTodoDto } from "../services/todoService";
import EditTodoForm from "./EditTodoForm";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updateData: UpdateTodoDto) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleComplete = async () => {
    setIsLoading(true);
    try {
      await onUpdate(todo.id, { isCompleted: !todo.isCompleted });
    } catch (error) {
      console.error("Error toggling complete status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      setIsLoading(true);
      try {
        await onDelete(todo.id);
      } catch (error) {
        console.error("Error deleting todo:", error);
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
            >
              {todo.isCompleted && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
            <div
              className={`flex-grow ${
                todo.isCompleted ? "text-gray-500 line-through" : ""
              }`}
            >
              <h3 className="font-medium">{todo.title}</h3>
              {todo.description && (
                <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Created: {new Date(todo.createdAt).toLocaleDateString()}
                {todo.updatedAt &&
                  `, Updated: ${new Date(todo.updatedAt).toLocaleDateString()}`}
              </p>
            </div>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700 p-1"
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 p-1"
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
