import { describe, expect, test } from 'bun:test';

import { filterPosts } from './filterPosts';
import { sortPosts } from './sortPosts';

import type { Post } from '@/types/Post';

function post(id: string, options: Partial<Post> = {}): Post {
  return {
    id,
    slug: id,
    title: id,
    date: '2026-01-01',
    excerpt: `${id} excerpt`,
    tags: [],
    image: { src: `/${id}.jpg`, alt: id, aspectRatio: '16 / 9' },
    category: 'GENERAL',
    subcategory: 'test',
    searchTerms: [],
    readingTime: 'Under 1 minute',
    featured: false,
    visible: true,
    ...options
  };
}

describe('filterPosts', () => {
  const posts = [
    post('alpha', { title: 'Rust without regret', tags: ['systems'] }),
    post('beta', {
      excerpt: 'A browser architecture field note',
      category: 'SOFTWARE ENGINEERING',
      searchTerms: ['javascript']
    })
  ];

  test('matches title, excerpt, category, tags, and search terms case-insensitively', () => {
    expect(filterPosts(posts, 'RUST').map(({ id }) => id)).toEqual(['alpha']);
    expect(filterPosts(posts, 'browser').map(({ id }) => id)).toEqual(['beta']);
    expect(filterPosts(posts, 'engineering').map(({ id }) => id)).toEqual(['beta']);
    expect(filterPosts(posts, 'systems').map(({ id }) => id)).toEqual(['alpha']);
    expect(filterPosts(posts, 'JavaScript').map(({ id }) => id)).toEqual(['beta']);
  });

  test('returns all posts for a blank query', () => {
    expect(filterPosts(posts, '   ')).toEqual(posts);
  });

  test('filters by an exact tag independently from full-text search', () => {
    expect(filterPosts(posts, '', 'systems').map(({ id }) => id)).toEqual(['alpha']);
    expect(filterPosts(posts, 'rust', 'systems').map(({ id }) => id)).toEqual(['alpha']);
    expect(filterPosts(posts, 'browser', 'systems')).toEqual([]);
  });

  test('combines category, tag, and query filters without partial category matches', () => {
    expect(filterPosts(posts, '', null, ' software engineering ')).toEqual([posts[1]!]);
    expect(filterPosts(posts, '', null, 'engineering')).toEqual([]);
    expect(filterPosts(posts, 'rust', 'systems', 'general')).toEqual([posts[0]!]);
    expect(filterPosts(posts, 'rust', 'systems', 'software engineering')).toEqual([]);
    expect(filterPosts(posts, 'browser', null, 'general')).toEqual([]);
  });

  test('treats empty filters as an unfiltered archive', () => {
    expect(filterPosts(posts, '', '  ', '  ')).toEqual(posts);
  });
});

describe('sortPosts', () => {
  test('orders by publication date in either direction without changing the source', () => {
    const posts = [
      post('middle', { date: '2025-11-01' }),
      post('newest', { date: '2026-01-01' }),
      post('oldest', { date: '2024-04-20' })
    ];

    expect(sortPosts(posts, 'newest').map(({ id }) => id)).toEqual(['newest', 'middle', 'oldest']);
    expect(sortPosts(posts, 'oldest').map(({ id }) => id)).toEqual(['oldest', 'middle', 'newest']);
    expect(posts.map(({ id }) => id)).toEqual(['middle', 'newest', 'oldest']);
  });
});
