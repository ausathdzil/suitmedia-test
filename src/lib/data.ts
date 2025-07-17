import type { GetIdeasParams, IdeaResponse } from './definitions';

export async function getIdeas({
  page = 1,
  size = 10,
  append = ['small_image', 'medium_image'],
  sort = '-published_at',
}: GetIdeasParams = {}): Promise<IdeaResponse | null> {
  const params = new URLSearchParams();
  params.append('page[number]', page.toString());
  params.append('page[size]', size.toString());
  for (const item of append) {
    params.append('append[]', item);
  }
  params.append('sort', sort);

  try {
    const res = await fetch(
      `${process.env.API_URL}/ideas?${params.toString()}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
    if (!res.ok) {
      throw new Error('Failed to fetch ideas');
    }
    const ideas: IdeaResponse = await res.json();
    return ideas;
  } catch (_error) {
    return null;
  }
}
