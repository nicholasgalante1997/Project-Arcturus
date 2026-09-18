import copy from '@/content/en.json';
import { formatMessage } from '@/utils/formatMessage';

interface PostsEmptyStateProps {
  query: string;
  tag: string | null;
  onClearSearch: () => void;
  onClearTag: () => void;
}

export function PostsEmptyState({ query, tag, onClearSearch, onClearTag }: PostsEmptyStateProps) {
  return (
    <div className="v2-posts-empty" aria-live="polite">
      <p>{formatMessage(copy.posts.noResults, { query: tag ?? query })}</p>
      {tag ? (
        <button type="button" onClick={onClearTag}>
          {copy.posts.clearTagFilter}
        </button>
      ) : (
        <button type="button" onClick={onClearSearch}>
          {copy.posts.clearSearch}
        </button>
      )}
    </div>
  );
}
