import Image from 'next/image';

import { IdeaImage } from '@/components/idea-image';
import { getIdeas } from '@/lib/data';
import type { Idea } from '@/lib/definitions';

export default function IdeasPage() {
  return (
    <main className="flex flex-1 flex-col gap-16 pb-16">
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
    return <div className="text-center">Failed to fetch ideas</div>;
  }

  return (
    <section className="grid w-full max-w-7xl grid-cols-1 gap-8 self-center lg:grid-cols-2 2xl:grid-cols-4">
      {ideas.data.map((idea) => (
        <IdeaCard idea={idea} key={idea.id} />
      ))}
    </section>
  );
}

function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <div className="flex h-full w-[300px] flex-col rounded-xl shadow-lg">
      <IdeaImage src={idea.small_image[0].url} title={idea.title} />
      <article className="flex-1 p-4 tracking-tight">
        <p className="font-semibold text-muted text-sm uppercase">
          {new Date(idea.published_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
        <h1 className="line-clamp-3 text-ellipsis font-semibold text-lg">
          {idea.title}
        </h1>
      </article>
    </div>
  );
}
