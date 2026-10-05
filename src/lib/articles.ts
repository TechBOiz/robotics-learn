import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

/** Published articles, ordered within each category. */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('articles', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.category.localeCompare(b.data.category) || a.data.order - b.data.order);
}

export async function getArticlesIn(category: string): Promise<Article[]> {
  return (await getArticles()).filter((a) => a.data.category === category);
}
