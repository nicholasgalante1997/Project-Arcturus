import { type FormEvent, memo, useRef, useState } from 'react';

import copy from '@/content/en.json';
import { pipeline } from '@/utils/pipeline';

import { ContactFormSuccess } from '../ContactFormSuccess';
import { ContactIdentityFields } from '../ContactIdentityFields';
import { ContactMessageFields } from '../ContactMessageFields';

import type { ContactFormData } from '../../types';
import type { ContactFormChangeEvent } from '../types';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnnpkkjo';
const { contact } = copy;

function ContactFormView() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = contact.validation.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = contact.validation.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = contact.validation.emailInvalid;
    }

    if (!formData.subject) {
      newErrors.subject = contact.validation.subjectRequired;
    }

    if (!formData.message.trim()) {
      newErrors.message = contact.validation.messageRequired;
    } else if (formData.message.trim().length < 20) {
      newErrors.message = contact.validation.messageLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    if (!validate()) return;

    setIsSubmitting(true);

    const data = new FormData(formRef.current);
    fetch(formRef.current.action, {
      method: formRef.current.method,
      body: data,
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          setSubmitSuccess(true);
          setIsSubmitting(false);
          setSubmitError(null);
          formRef.current?.reset();
        } else {
          setSubmitError(contact.submitError);
          setIsSubmitting(false);
          console.error('Form submission error:', response.statusText);
        }
      })
      .catch((error) => {
        setSubmitError(contact.submitError);
        setIsSubmitting(false);
        console.error('Form submission error:', error);
      });
  };

  const handleChange = (e: ContactFormChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on change
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (submitSuccess) {
    return <ContactFormSuccess />;
  }

  return (
    <form
      className="v2-contact-form"
      id="_v2-contact-form"
      action={FORMSPREE_ENDPOINT}
      method="POST"
      onSubmit={handleSubmit}
      ref={formRef}
      noValidate
    >
      <ContactIdentityFields formData={formData} errors={errors} onChange={handleChange} />
      <ContactMessageFields formData={formData} errors={errors} onChange={handleChange} />

      {submitError && (
        <div className="v2-contact-form__error" role="alert">
          {submitError}
        </div>
      )}

      <button type="submit" className="v2-contact-form__submit" disabled={isSubmitting}>
        {isSubmitting ? contact.submitting : contact.submit}
      </button>
    </form>
  );
}

export default pipeline(memo)(ContactFormView);
