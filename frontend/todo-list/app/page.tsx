import TodoList from "./components/ui/TodoList/TodoList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <TodoList />
      </main>
    </div>
  );
}
