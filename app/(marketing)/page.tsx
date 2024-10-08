import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <h2 className="mb-3 text-2xl font-semibold">Hello!</h2>
      <Button size="lg">Greet</Button>
    </main>
  );
}
