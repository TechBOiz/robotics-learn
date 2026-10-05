import { categories } from '../data/categories';
import { getArticles } from './articles';
import { articleHref, href, readingMinutes } from './paths';

export interface OutlineArticle { id: string; title: string; summary: string; level: 'intro' | 'intermediate' | 'advanced'; minutes: number; url: string }
export interface OutlineTopic { id: string; name: string; blurb: string; url: string; articles: OutlineArticle[] }

export const levelLabel = { intro: 'Intro', intermediate: 'Intermediate', advanced: 'Advanced' } as const;

/** Topics in display order, each with its published articles. Topics with no articles are left out. */
export async function getOutline(): Promise<OutlineTopic[]> {
  const all = await getArticles();
  return categories
    .map((c) => ({
      id: c.id,
      name: c.name,
      blurb: c.blurb,
      url: href(`/${c.id}/`),
      articles: all
        .filter((a) => a.data.category === c.id)
        .map((a) => ({ id: a.id, title: a.data.title, summary: a.data.summary, level: a.data.level, minutes: readingMinutes(a.body), url: articleHref(a.id) })),
    }))
    .filter((t) => t.articles.length > 0);
}
