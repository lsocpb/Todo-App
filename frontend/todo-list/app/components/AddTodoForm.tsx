"use client";
import { useState } from "react";
import { CreateTodoDto } from "../services/todoService";

interface AddTodoFormProps {
  onAddTodo: (todo: CreateTodoDto) => Promise<void>;
  onCancel: () => void;
}

export default function AddTodoForm({ onAddTodo, onCancel }: AddTodoFormProps) {
  const [newTodo, setNewTodo] = useState<CreateTodoDto>({
    title: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddTodo({
        title: newTodo.title.trim(),
        description: newTodo.description?.trim() || undefined,
      });
      // Form will be hidden by parent component after successful submission
    } catch (error) {
      console.error("Error in AddTodoForm:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded-md">
      <div className="mb-3">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="What needs to be done?"
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description (optional)
        </label>
        <textarea
          id="description"
          value={newTodo.description || ""}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add more details..."
          rows={2}
          disabled={isSubmitting}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition disabled:opacity-50"
          disabled={isSubmitting || !newTodo.title.trim()}
        >
          {isSubmitting ? "Adding..." : "Add Todo"}
        </button>
      </div>
    </form>
  );
}
