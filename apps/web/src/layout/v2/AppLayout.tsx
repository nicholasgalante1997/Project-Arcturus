import clsx from 'clsx';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router';

import { DefaultFallbackErrorComponent } from '@/components/Base/Error';
import { V2Footer } from '@/components/v2/Footer';
import { V2Header } from '@/components/v2/Header';
import ArcSentry from '@/config/sentry/config';
import copy from '@/content/en.json';
import { ArcThemeProvider } from '@/context/theme';
import { pipeline } from '@/utils/pipeline';

import { SiteBackground } from './components/SiteBackground';
import { resolveBackgroundTreatment } from './background';

import type { V2AppLayoutProps } from './types';

/**
 * V2 App Layout component
 *
 * Composes the application shell with Header, Footer, and main content area.
 * Includes ErrorBoundary for error handling and a shared decorative background.
 *
 * @example
 * // Standard layout
 * <V2AppLayout>
 *   <PageContent />
 * </V2AppLayout>
 *
 * @example
 * // With transparent header for hero pages
 * <V2AppLayout transparentHeader>
 *   <HeroSection />
 * </V2AppLayout>
 */
function AppLayoutV2({
  children,
  transparentHeader = false,
  className,
  showFooter = true
}: V2AppLayoutProps) {
  const [searchParams] = useSearchParams();
  const background = resolveBackgroundTreatment(searchParams.get('background'));

  return (
    <ErrorBoundary
      onError={ArcSentry.sentryReactDefaultErrorHandler as (error: unknown, info: React.ErrorInfo) => void}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <DefaultFallbackErrorComponent error={error} reset={resetErrorBoundary} />
      )}
    >
      <ArcThemeProvider>
        <div className={clsx('v2-app-layout', className)} data-background={background}>
          <SiteBackground treatment={background} />
          <a className="v2-skip-link" href="#main-content">
            {copy.site.skipToContent}
          </a>
          <V2Header transparent={transparentHeader} />
          <main id="main-content" className="v2-app-layout__main">
            {children}
          </main>
          {showFooter && <V2Footer />}
        </div>
      </ArcThemeProvider>
    </ErrorBoundary>
  );
}

export default pipeline(React.memo)(AppLayoutV2) as React.MemoExoticComponent<typeof AppLayoutV2>;
