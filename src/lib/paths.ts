const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a root-relative path with the deployed base path. */
export function href(path = '/'): string {
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** "actuators/02-types-of-actuators" -> { category: "actuators", slug: "types-of-actuators" } */
export function splitId(id: string): { category: string; slug: string } {
  const [category, ...rest] = id.split('/');
  const slug = rest.join('/').replace(/^\d+-/, '');
  return { category, slug };
}

export function articleHref(id: string): string {
  const { category, slug } = splitId(id);
  return href(`/${category}/${slug}/`);
}

export function readingMinutes(body = ''): number {
  const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
