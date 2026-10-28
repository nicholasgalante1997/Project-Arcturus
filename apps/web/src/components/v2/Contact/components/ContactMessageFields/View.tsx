import copy from '@/content/en.json';

import type { ContactFormFieldsProps } from '../types';

export default function ContactMessageFields({ formData, errors, onChange }: ContactFormFieldsProps) {
  return (
    <>
      <div className="v2-contact-field">
        <label htmlFor="contact-subject">{copy.contact.fields.subject}</label>
        <select
          id="contact-subject"
          name="subject"
          value={formData.subject}
          onChange={onChange}
          required
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
        >
          {copy.contact.subjects.map((option) => (
            <option key={option.value || 'empty'} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p id="contact-subject-error" className="v2-contact-field__error">
            {errors.subject}
          </p>
        )}
      </div>

      <div className="v2-contact-field">
        <label htmlFor="contact-message">{copy.contact.fields.message}</label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={onChange}
          required
          rows={6}
          placeholder={copy.contact.fields.messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="v2-contact-field__error">
            {errors.message}
          </p>
        )}
      </div>
    </>
  );
}
