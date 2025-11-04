import Image from "next/image";
import { QuickStartCard } from "./components/quickstart-card";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-gray-950">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16">
        <QuickStartCard />
      </main>
    </div>
  );
}
