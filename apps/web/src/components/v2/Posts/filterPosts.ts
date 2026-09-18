import type { Post } from '@/types/Post';

export function filterPosts(posts: readonly Post[], query: string, tag: string | null = null): Post[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const normalizedTag = tag?.trim().toLocaleLowerCase() ?? '';

  return posts.filter((post) => {
    const matchesTag =
      !normalizedTag || post.tags.some((postTag) => postTag.toLocaleLowerCase() === normalizedTag);
    if (!matchesTag) return false;

    if (!normalizedQuery) return true;

    const searchableValues = [post.title, post.excerpt, post.category, ...post.tags, ...post.searchTerms];

    return searchableValues.some((value) => value.toLocaleLowerCase().includes(normalizedQuery));
  });
}
