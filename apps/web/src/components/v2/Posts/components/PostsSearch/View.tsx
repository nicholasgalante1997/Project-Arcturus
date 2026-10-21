import { useRef } from 'react';

import copy from '@/content/en.json';

interface PostsSearchProps {
  query: string;
  onChange: (query: string) => void;
}

export default function PostsSearch({ query, onChange }: PostsSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const clearSearch = (): void => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="v2-posts-search" role="search" aria-label={copy.posts.searchLabel}>
      <label className="v2-visually-hidden" htmlFor="posts-search">
        {copy.posts.searchLabel}
      </label>
      <svg
        className="v2-posts-search__icon"
        width="22"
        height="22"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="7.75" cy="7.75" r="5.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="m11.5 11.5 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        ref={inputRef}
        id="posts-search"
        type="search"
        value={query}
        placeholder={copy.posts.searchPlaceholder}
        className="v2-posts-search__input"
        autoComplete="off"
        spellCheck={false}
        aria-controls="posts-results"
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && query) {
            event.preventDefault();
            clearSearch();
          }
        }}
      />
      {query && (
        <button
          type="button"
          className="v2-posts-search__clear"
          aria-label={copy.posts.clearSearch}
          onClick={clearSearch}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
