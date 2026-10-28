import type { ContactFormData } from '../types';
import type { ChangeEvent } from 'react';

export type ContactFormChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

export interface ContactFormFieldsProps {
  formData: ContactFormData;
  errors: Partial<ContactFormData>;
  onChange: (event: ContactFormChangeEvent) => void;
}
