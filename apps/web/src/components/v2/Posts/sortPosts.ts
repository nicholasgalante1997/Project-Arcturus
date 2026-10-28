import type { Post } from '@/types/Post';

export type PostsSortOrder = 'newest' | 'oldest';

export function sortPosts(posts: readonly Post[], order: PostsSortOrder): Post[] {
  return [...posts].sort((a, b) => {
    const difference = new Date(a.date).getTime() - new Date(b.date).getTime();
    return order === 'oldest' ? difference : -difference;
  });
}
