import copy from '@/content/en.json';

interface PostsSearchProps {
  query: string;
  onChange: (query: string) => void;
}

export default function PostsSearch({ query, onChange }: PostsSearchProps) {
  return (
    <div className="v2-posts-search">
      <label className="v2-visually-hidden" htmlFor="posts-search">
        {copy.posts.searchLabel}
      </label>
      <svg
        className="v2-posts-search__icon"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="7.75" cy="7.75" r="5.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="m11.5 11.5 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        id="posts-search"
        type="search"
        value={query}
        placeholder={copy.posts.searchPlaceholder}
        className="v2-posts-search__input"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
