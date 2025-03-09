"use client";
import { useState } from "react";
import { UpdateTodoDto, Todo } from "../services/todoService";

interface EditTodoFormProps {
  todo: Todo;
  onUpdate: (id: string, updateData: UpdateTodoDto) => Promise<void>;
  onCancel: () => void;
}

export default function EditTodoForm({
  todo,
  onUpdate,
  onCancel,
}: EditTodoFormProps) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      await onUpdate(todo.id, {
        title: title.trim(),
        description: description.trim() || undefined,
      });
      onCancel(); // Hide form after successful update
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Title"
        disabled={isLoading}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Description (optional)"
        rows={2}
        disabled={isLoading}
      />
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={isLoading || !title.trim()}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
