import copy from '@/content/en.json';
import { formatMessage } from '@/utils/formatMessage';

export function FooterAttribution({ year }: { year: number }) {
  return (
    <div className="v2-footer__bottom">
      <p className="v2-footer__copyright">{formatMessage(copy.site.footer.copyright, { year })}</p>
      <p className="v2-footer__attribution">
        {copy.site.footer.builtWithPrefix}{' '}
        <span className="v2-footer__heart" aria-label={copy.site.footer.builtWithAriaLabel}>
          {copy.site.footer.builtWithValue}
        </span>{' '}
        {copy.site.footer.builtWithSuffix}
      </p>
    </div>
  );
}
