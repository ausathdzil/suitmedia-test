import Image from 'next/image';
import { getIdeas } from '@/lib/data';

export default function IdeasPage() {
  return (
    <main className="flex min-h-[200vh] flex-col">
      <section className="relative h-[500px] w-full overflow-hidden">
        <Image
          alt="Hero banner"
          className="object-cover"
          fill
          priority
          quality={100}
          src="/hero.jpg"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 mt-20 flex flex-col items-center justify-center">
          <h1 className="text-5xl text-primary-foreground">Ideas</h1>
          <p className="text-primary-foreground">
            Where all our great things begin
          </p>
        </div>
        <div className="absolute bottom-0 left-0 h-0 w-full border-r-0 border-r-transparent border-b-[120px] border-b-background border-l-[100vw] border-l-transparent" />
      </section>
      <Ideas />
    </main>
  );
}

async function Ideas() {
  const ideas = await getIdeas();

  if (!ideas) {
    return <div>Failed to fetch ideas</div>;
  }

  return <pre>{JSON.stringify(ideas.data, null, 2)}</pre>;
}
