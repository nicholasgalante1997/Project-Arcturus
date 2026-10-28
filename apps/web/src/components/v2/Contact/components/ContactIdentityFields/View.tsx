import copy from '@/content/en.json';

import type { ContactFormFieldsProps } from '../types';

export default function ContactIdentityFields({ formData, errors, onChange }: ContactFormFieldsProps) {
  return (
    <>
      <div className="v2-contact-field">
        <label htmlFor="contact-name">{copy.contact.fields.name}</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={onChange}
          required
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
        />
        {errors.name && (
          <p id="contact-name-error" className="v2-contact-field__error">
            {errors.name}
          </p>
        )}
      </div>

      <div className="v2-contact-field">
        <label htmlFor="contact-email">{copy.contact.fields.email}</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          required
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
        />
        {errors.email && (
          <p id="contact-email-error" className="v2-contact-field__error">
            {errors.email}
          </p>
        )}
      </div>
    </>
  );
}
