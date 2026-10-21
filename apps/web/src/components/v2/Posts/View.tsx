import { memo, use, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import copy from '@/content/en.json';
import { pipeline } from '@/utils/pipeline';
import { withProfiler } from '@/utils/profiler';

import { PostsEmptyState } from './components/PostsEmptyState';
import { PostsFilters } from './components/PostsFilters';
import { PostsFilterStatus } from './components/PostsFilterStatus';
import { PostsGridView } from './components/PostsGrid';
import { PostsSearch } from './components/PostsSearch';
import { filterPosts } from './filterPosts';
import { sortPosts } from './sortPosts';

import type { V2PostsPageViewProps } from './types';

function V2PostsPageView({ queries }: V2PostsPageViewProps) {
  const [postsQuery] = queries;
  const allPosts = use(postsQuery.promise);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') ?? '';
  const selectedTag = searchParams.get('tag');
  const selectedCategory = searchParams.get('category');
  const sortOrder = searchParams.get('sort') === 'oldest' ? 'oldest' : 'newest';
  const normalizedQuery = searchQuery.trim();
  const hasFilters = Boolean(normalizedQuery || selectedTag || selectedCategory);

  const categories = useMemo(() => [...new Set(allPosts.map(({ category }) => category))].sort(), [allPosts]);

  const filteredPosts = useMemo(
    () => sortPosts(filterPosts(allPosts, normalizedQuery, selectedTag, selectedCategory), sortOrder),
    [allPosts, normalizedQuery, selectedTag, selectedCategory, sortOrder]
  );

  const updateParameter = (key: string, value: string): void => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) nextParams.set(key, value);
    else nextParams.delete(key);
    setSearchParams(nextParams, { replace: true });
  };

  const clearFilters = (): void => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('q');
    nextParams.delete('tag');
    nextParams.delete('category');
    setSearchParams(nextParams, { replace: true });
  };

  return (
    <div className="v2-posts-page">
      <div className="wrapper">
        <header className="v2-posts-page__header">
          <h1 className="v2-visually-hidden">{copy.posts.title}</h1>
          <PostsSearch query={searchQuery} onChange={(query) => updateParameter('q', query)} />
          <PostsFilters
            categories={categories}
            selectedCategory={selectedCategory}
            sortOrder={sortOrder}
            onCategoryChange={(category) => updateParameter('category', category)}
            onSortChange={(sort) => updateParameter('sort', sort === 'newest' ? '' : sort)}
          />
        </header>

        <PostsFilterStatus
          count={filteredPosts.length}
          total={allPosts.length}
          hasFilters={hasFilters}
          tag={selectedTag}
          onClearTag={() => updateParameter('tag', '')}
          onClearFilters={clearFilters}
        />

        <div id="posts-results">
          {filteredPosts.length > 0 ? (
            <PostsGridView posts={filteredPosts} />
          ) : (
            <PostsEmptyState query={normalizedQuery} onClearFilters={clearFilters} />
          )}
        </div>
      </div>
    </div>
  );
}

export default pipeline(memo, withProfiler('v2_Posts_Page_View'))(V2PostsPageView);
