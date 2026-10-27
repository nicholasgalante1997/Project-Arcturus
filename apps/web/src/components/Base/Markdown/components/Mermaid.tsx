import { isValidElement, memo, useEffect, useId, useRef, useState } from 'react';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { RenderResult } from 'mermaid';

type CodeElementProps = {
  className?: string;
  children?: ReactNode;
};

type MarkdownPreProps = ComponentPropsWithoutRef<'pre'> & {
  node?: unknown;
};

interface MermaidDiagramProps {
  chart: string;
}

interface RenderedDiagram extends RenderResult {
  source: string;
}

function getTextContent(children: ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getTextContent).join('');
  }

  if (isValidElement<CodeElementProps>(children)) {
    return getTextContent(children.props.children);
  }

  return '';
}

function isMermaidCodeBlock(children: ReactNode): children is React.ReactElement<CodeElementProps> {
  return (
    isValidElement<CodeElementProps>(children) &&
    /(?:^|\s)language-mermaid(?:\s|$)/.test(children.props.className ?? '')
  );
}

function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const id = useId().replaceAll(':', '');
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderedDiagram, setRenderedDiagram] = useState<RenderedDiagram | null>(null);

  useEffect(() => {
    let disposed = false;

    setRenderedDiagram(null);

    void (async () => {
      try {
        const { default: mermaid } = await import('mermaid');

        mermaid.initialize({ startOnLoad: false, securityLevel: 'strict' });

        const result = await mermaid.render(`mermaid-${id}`, chart);

        if (!disposed) {
          setRenderedDiagram({ ...result, source: chart });
        }
      } catch (error) {
        // Keep the source visible when a diagram is malformed or Mermaid cannot load.
        console.error('Unable to render Mermaid diagram.', error);
      }
    })();

    return () => {
      disposed = true;
    };
  }, [chart, id]);

  useEffect(() => {
    if (renderedDiagram && containerRef.current) {
      renderedDiagram.bindFunctions?.(containerRef.current);
    }
  }, [renderedDiagram]);

  const hasRenderedDiagram = renderedDiagram?.source === chart;

  return (
    <div
      ref={containerRef}
      className="mermaid-diagram"
      aria-label="Mermaid diagram"
      aria-busy={!hasRenderedDiagram}
    >
      {hasRenderedDiagram ? (
        <div dangerouslySetInnerHTML={{ __html: renderedDiagram.svg }} />
      ) : (
        <pre>
          <code className="language-mermaid">{chart}</code>
        </pre>
      )}
    </div>
  );
}

export function MarkdownPre({ children, node: _node, ...props }: MarkdownPreProps) {
  if (isMermaidCodeBlock(children)) {
    return <MermaidDiagram chart={getTextContent(children.props.children).replace(/\n$/, '')} />;
  }

  return <pre {...props}>{children}</pre>;
}

export default memo(MermaidDiagram);
