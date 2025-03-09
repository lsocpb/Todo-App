import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          TODO List
        </h1>

        <TodoList />
      </main>
    </div>
  );
}
