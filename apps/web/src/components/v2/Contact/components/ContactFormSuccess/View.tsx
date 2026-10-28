import copy from '@/content/en.json';

export default function ContactFormSuccess() {
  return (
    <div className="v2-contact-form__success" role="status">
      <p className="v2-contact-form__success-mark" aria-hidden="true">
        ✓
      </p>
      <h3>{copy.contact.successTitle}</h3>
      <p>{copy.contact.successDescription}</p>
    </div>
  );
}
