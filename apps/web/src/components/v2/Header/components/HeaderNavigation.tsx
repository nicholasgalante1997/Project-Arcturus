import { Link } from 'react-router';

import { getActiveTabByPathname, NAVIGATION_ITEMS } from '../constants';

interface HeaderNavigationProps {
  onNavigate?: () => void;
  showActiveState?: boolean;
}

export function HeaderNavigation({ onNavigate, showActiveState = false }: HeaderNavigationProps) {
  return (
    <ul>
      {NAVIGATION_ITEMS.map((item) => (
        <li key={item.href}>
          <Link
            data-active-tab={showActiveState ? getActiveTabByPathname(item.activeTab) : undefined}
            to={item.href}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
