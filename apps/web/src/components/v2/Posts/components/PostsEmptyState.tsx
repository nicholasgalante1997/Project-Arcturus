import copy from '@/content/en.json';
import { formatMessage } from '@/utils/formatMessage';

interface PostsEmptyStateProps {
  query: string;
  onClearFilters: () => void;
}

export function PostsEmptyState({ query, onClearFilters }: PostsEmptyStateProps) {
  return (
    <div className="v2-posts-empty">
      <h2>{copy.posts.noResultsTitle}</h2>
      <p>{query ? formatMessage(copy.posts.noResults, { query }) : copy.posts.noResultsHint}</p>
      <button type="button" onClick={onClearFilters}>
        {copy.posts.resetFilters}
      </button>
    </div>
  );
}
