import type { IdeaResponse } from './definitions';

interface GetIdeasParams {
  page?: string;
  size?: string;
  append?: string[];
  sort?: string;
}

export async function getIdeas({
  page = '1',
  size = '10',
  append = ['small_image', 'medium_image'],
  sort = '-published_at',
}: GetIdeasParams = {}): Promise<IdeaResponse | null> {
  const params = [
    `page[number]=${page}`,
    `page[size]=${size}`,
    ...append.map((item) => `append[]=${item}`),
    `sort=${sort}`,
  ].join('&');

  const url = `${process.env.API_URL}/ideas?${params}`;

  try {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch ideas');
    }
    const ideas: IdeaResponse = await res.json();
    return ideas;
  } catch (_error) {
    return null;
  }
}
