import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

import { pipeline } from '@/utils/pipeline';

import { CodeBlock } from './components/CodeBlock';
import { MarkdownPre } from './components/Mermaid';
import { modifiedSanitizationSchema } from './utils/rehype-sanitize';
import { MarkdownViewProps } from './types';

function MarkdownView({ markdown }: MarkdownViewProps) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, [rehypeSanitize, modifiedSanitizationSchema]]}
      remarkPlugins={[remarkGfm]}
      components={{
        code: CodeBlock as React.ComponentType<
          React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>
        >,
        pre: MarkdownPre as React.ComponentType<
          React.ClassAttributes<HTMLPreElement> & React.HTMLAttributes<HTMLPreElement>
        >
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}

export default pipeline(memo)(MarkdownView) as React.MemoExoticComponent<
  React.ComponentType<MarkdownViewProps>
>;
