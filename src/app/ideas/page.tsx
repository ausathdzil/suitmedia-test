import Image from 'next/image';

import { IdeaImage } from '@/components/idea-image';
import { IdeasFilter } from '@/components/ideas-filter';
import { Pagination } from '@/components/pagination';
import { getIdeas } from '@/lib/data';
import type { Idea } from '@/lib/definitions';

interface IdeasPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
    sort?: string;
  }>;
}

export default function IdeasPage(props: IdeasPageProps) {
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
      <Ideas searchParams={props.searchParams} />
    </main>
  );
}

async function Ideas(props: IdeasPageProps) {
  const { page, size, sort } = await props.searchParams;

  const ideas = await getIdeas({
    page: page ?? '1',
    size: size ?? '10',
    sort: sort === 'newest' ? '-published_at' : 'published_at',
  });

  if (!ideas) {
    return <div className="text-center">Failed to fetch ideas</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center gap-8">
      <IdeasFilter
        from={ideas.meta.from}
        to={ideas.meta.to ?? 0}
        total={ideas.meta.total}
      />
      <ul className="flex flex-wrap items-center justify-center gap-8">
        {ideas.data.map((idea) => (
          <li key={idea.id}>
            <IdeaCard idea={idea} />
          </li>
        ))}
      </ul>
      <Pagination meta={ideas.meta} />
    </section>
  );
}

function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <div className="flex h-full min-h-[286px] w-[300px] flex-col rounded-xl shadow-lg">
      <IdeaImage
        src={idea.small_image?.[0]?.url ?? idea.medium_image?.[0]?.url ?? ''}
        title={idea.title}
      />
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
