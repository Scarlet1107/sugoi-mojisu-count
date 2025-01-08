import Header from "@/components/Header";
import ResponsiveSwitcher from "@/components/ResponsiveSwitcher";

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <Header />
      <ResponsiveSwitcher />
    </main>
  );
}
