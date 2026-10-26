import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';

import MarkdownView from './View';

describe('MarkdownView', () => {
  test('recognizes Mermaid fenced code blocks', () => {
    const markup = renderToStaticMarkup(
      <MarkdownView markdown={'```mermaid\ngraph LR\n  Author --> Reader\n```'} />
    );

    expect(markup).toContain('class="mermaid-diagram"');
    expect(markup).toContain('class="language-mermaid"');
    expect(markup).toContain('Author --&gt; Reader');
  });
});
