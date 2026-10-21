import copy from '@/content/en.json';
import { formatMessage } from '@/utils/formatMessage';

import { ThemeIcon } from './HeaderIcons';

import type { V2HeaderViewProps } from '../types';

type HeaderThemeToggleProps = Pick<V2HeaderViewProps, 'theme' | 'onCycleTheme'>;

export function HeaderThemeToggle({ theme, onCycleTheme }: HeaderThemeToggleProps) {
  const nextTheme =
    theme === 'system'
      ? copy.site.theme.light
      : theme === 'light'
        ? copy.site.theme.dark
        : copy.site.theme.system;

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={formatMessage(copy.site.theme.controlLabel, {
        theme: copy.site.theme[theme],
        nextTheme
      })}
      title={formatMessage(copy.site.theme.controlTitle, { theme: copy.site.theme[theme] })}
      onClick={onCycleTheme}
    >
      <ThemeIcon theme={theme} />
      <span className="theme-toggle__label">{copy.site.theme[theme]}</span>
    </button>
  );
}
