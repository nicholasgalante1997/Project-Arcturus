import copy from '@/content/en.json';
import { formatMessage } from '@/utils/formatMessage';

interface PostsFilterStatusProps {
  count: number;
  total: number;
  hasFilters: boolean;
  tag: string | null;
  onClearTag: () => void;
  onClearFilters: () => void;
}

export default function PostsFilterStatus({
  count,
  total,
  hasFilters,
  tag,
  onClearTag,
  onClearFilters
}: PostsFilterStatusProps) {
  const resultMessage = hasFilters
    ? copy.posts.filteredCount
    : count === 1
      ? copy.posts.resultCountOne
      : copy.posts.resultCountMany;

  return (
    <div className="v2-posts-status">
      <div className="v2-posts-status__summary">
        <p className="v2-posts-page__count" role="status" aria-atomic="true">
          {formatMessage(resultMessage, { count, total })}
        </p>
        {tag && (
          <button
            type="button"
            className="v2-posts-status__tag"
            aria-label={formatMessage(copy.posts.removeTag, { tag })}
            onClick={onClearTag}
          >
            <span>#{tag}</span>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      {hasFilters && (
        <button type="button" className="v2-posts-status__reset" onClick={onClearFilters}>
          {copy.posts.clearFilters}
        </button>
      )}
    </div>
  );
}
