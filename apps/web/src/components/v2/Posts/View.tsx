import { memo, use, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import copy from '@/content/en.json';
import { pipeline } from '@/utils/pipeline';
import { withProfiler } from '@/utils/profiler';

import { PostsEmptyState } from './components/PostsEmptyState';
import { PostsFilterStatus } from './components/PostsFilterStatus';
import { PostsGridView } from './components/PostsGrid';
import { PostsSearch } from './components/PostsSearch';
import { filterPosts } from './filterPosts';

import type { V2PostsPageViewProps } from './types';

function V2PostsPageView({ queries }: V2PostsPageViewProps) {
  const [postsQuery] = queries;
  const allPosts = use(postsQuery.promise);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') ?? '';
  const selectedTag = searchParams.get('tag');
  const normalizedQuery = searchQuery.trim();

  const filteredPosts = useMemo(
    () => filterPosts(allPosts, normalizedQuery, selectedTag),
    [allPosts, normalizedQuery, selectedTag]
  );

  const updateSearch = (query: string): void => {
    const nextParams = new URLSearchParams(searchParams);
    if (query) nextParams.set('q', query);
    else nextParams.delete('q');
    setSearchParams(nextParams, { replace: true });
  };

  const clearTag = (): void => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('tag');
    setSearchParams(nextParams, { replace: true });
  };

  return (
    <div className="v2-posts-page">
      <div className="wrapper">
        <header className="v2-posts-page__header">
          <div className="v2-posts-page__introduction">
            <h1 className="v2-visually-hidden">{copy.posts.title}</h1>
            <p>{copy.posts.intro}</p>
          </div>
          <PostsSearch query={searchQuery} onChange={updateSearch} />
        </header>

        <PostsFilterStatus
          count={filteredPosts.length}
          query={normalizedQuery}
          tag={selectedTag}
          onClearTag={clearTag}
        />

        {filteredPosts.length > 0 ? (
          <PostsGridView posts={filteredPosts} />
        ) : (
          <PostsEmptyState
            query={normalizedQuery}
            tag={selectedTag}
            onClearSearch={() => updateSearch('')}
            onClearTag={clearTag}
          />
        )}
      </div>
    </div>
  );
}

export default pipeline(memo, withProfiler('v2_Posts_Page_View'))(V2PostsPageView);
