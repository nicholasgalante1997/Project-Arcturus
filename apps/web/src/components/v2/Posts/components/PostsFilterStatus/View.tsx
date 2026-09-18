import copy from '@/content/en.json';
import { formatMessage } from '@/utils/formatMessage';

interface PostsFilterStatusProps {
  count: number;
  query: string;
  tag: string | null;
  onClearTag: () => void;
}

export default function PostsFilterStatus({ count, query, tag, onClearTag }: PostsFilterStatusProps) {
  const filterLabel = tag ?? query;
  const resultMessage = count === 1 ? copy.posts.resultCountOne : copy.posts.resultCountMany;

  return (
    <>
      {(query || tag) && count > 0 && (
        <p className="v2-posts-page__count" aria-live="polite">
          {formatMessage(resultMessage, { count, query: filterLabel })}
        </p>
      )}
      {tag && (
        <div className="v2-posts-page__tag-filter">
          <span>{formatMessage(copy.posts.tagFilter, { tag })}</span>
          <button type="button" onClick={onClearTag}>
            {copy.posts.clearTagFilter}
          </button>
        </div>
      )}
    </>
  );
}
