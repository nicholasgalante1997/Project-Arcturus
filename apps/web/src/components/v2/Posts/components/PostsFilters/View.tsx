import copy from '@/content/en.json';
import { formatPostCategory } from '@/utils/postPresentation';

import type { PostsSortOrder } from '../../sortPosts';

interface PostsFiltersProps {
  categories: string[];
  selectedCategory: string | null;
  sortOrder: PostsSortOrder;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: PostsSortOrder) => void;
}

export default function PostsFilters({
  categories,
  selectedCategory,
  sortOrder,
  onCategoryChange,
  onSortChange
}: PostsFiltersProps) {
  return (
    <div className="v2-posts-filters">
      <div className="v2-posts-filters__categories" role="group" aria-label={copy.posts.categoryLabel}>
        <button
          type="button"
          className="v2-posts-filters__chip"
          aria-pressed={!selectedCategory}
          aria-controls="posts-results"
          onClick={() => onCategoryChange('')}
        >
          {copy.posts.allCategories}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className="v2-posts-filters__chip"
            aria-pressed={selectedCategory?.trim().toLocaleLowerCase() === category.toLocaleLowerCase()}
            aria-controls="posts-results"
            onClick={() => onCategoryChange(category.toLocaleLowerCase())}
          >
            {formatPostCategory(category)}
          </button>
        ))}
      </div>
      <div className="v2-posts-filters__sort">
        <label className="v2-visually-hidden" htmlFor="posts-sort">
          {copy.posts.sortLabel}
        </label>
        <select
          id="posts-sort"
          value={sortOrder}
          aria-controls="posts-results"
          onChange={(event) => onSortChange(event.target.value === 'oldest' ? 'oldest' : 'newest')}
        >
          <option value="newest">{copy.posts.newestFirst}</option>
          <option value="oldest">{copy.posts.oldestFirst}</option>
        </select>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="m4 6 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
