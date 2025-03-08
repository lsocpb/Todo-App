import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800">
          TODO List
        </h1>
      </main>
    </div>
  );
}
