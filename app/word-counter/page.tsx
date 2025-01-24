import Header from "@/app/word-counter/components/Header";
import ResponsiveSwitcher from "@/app/word-counter/components/ResponsiveSwitcher";

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <Header />
      <ResponsiveSwitcher />
    </main>
  );
}
