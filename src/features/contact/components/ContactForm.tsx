import { useState, type FormEvent } from 'react';
import { CheckCircle2, ChevronDown, Loader2, Send } from 'lucide-react';
import { useLanguage } from '@/shared/i18n/useLanguage';
import type { TranslationKey } from '@/shared/i18n/translations';
import { isValidEmail, submitMessage, type SubjectKey } from '@/features/contact/data/contact';
import './contact.css';

const subjects: { key: SubjectKey; label: TranslationKey }[] = [
  { key: 'general', label: 'contact.subjectGeneral' },
  { key: 'join', label: 'contact.subjectJoin' },
  { key: 'collab', label: 'contact.subjectCollab' },
  { key: 'other', label: 'contact.subjectOther' },
];

type Field = 'name' | 'email' | 'message';
type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

const PLANE_FLIGHT_MS = 450;

const emptyForm = { name: '', email: '', subject: 'general' as SubjectKey, message: '' };

/** Message form with floating labels and inline validation. Sending is handled in data/contact.ts. */
export default function ContactForm() {
  const { lang, t } = useLanguage();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<Field, TranslationKey>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [launching, setLaunching] = useState(false);
  const kannadaFont = lang === 'kn' ? 'kannada-text' : '';

  const validate = () => {
    const next: Partial<Record<Field, TranslationKey>> = {};
    if (!form.name.trim()) next.name = 'contact.errorName';
    if (!form.email.trim()) next.email = 'contact.errorEmail';
    else if (!isValidEmail(form.email)) next.email = 'contact.errorEmailInvalid';
    if (!form.message.trim()) next.message = 'contact.errorMessage';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const update = (field: keyof typeof emptyForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (field in errors) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    // Let the paper plane fly off before the spinner takes its place
    setLaunching(true);
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    await new Promise((resolve) => setTimeout(resolve, reduceMotion ? 0 : PLANE_FLIGHT_MS));
    setStatus('sending');
    const subjectLabel = subjects.find((subject) => subject.key === form.subject)!.label;
    try {
      const result = await submitMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: t(subjectLabel),
        message: form.message.trim(),
      });
      setStatus(result);
      if (result === 'sent') setForm(emptyForm);
    } catch {
      setStatus('error');
    } finally {
      setLaunching(false);
    }
  };

  const errorText = (field: Field) =>
    errors[field] ? (
      <p id={`contact-${field}-error`} className={`mt-1.5 text-sm text-red-400 ${kannadaFont}`}>
        {t(errors[field]!)}
      </p>
    ) : null;

  const inputProps = (field: Field) => ({
    id: `contact-${field}`,
    name: field,
    value: form[field],
    placeholder: ' ',
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
    className: 'contact-input',
  });

  return (
    <form noValidate onSubmit={handleSubmit} className="contact-glass contact-reveal-right flex h-full flex-col gap-5 p-6 sm:p-8">
      <h2 className={`text-2xl font-bold text-white ${kannadaFont}`}>{t('contact.formTitle')}</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <div className="contact-field">
            <input type="text" autoComplete="name" {...inputProps('name')} onChange={(e) => update('name', e.target.value)} />
            <label htmlFor="contact-name" className={`contact-label ${kannadaFont}`}>{t('contact.name')}</label>
          </div>
          {errorText('name')}
        </div>
        <div>
          <div className="contact-field">
            <input type="email" autoComplete="email" {...inputProps('email')} onChange={(e) => update('email', e.target.value)} />
            <label htmlFor="contact-email" className={`contact-label ${kannadaFont}`}>{t('contact.email')}</label>
          </div>
          {errorText('email')}
        </div>
      </div>

      <div className="contact-field">
        <select
          id="contact-subject"
          name="subject"
          value={form.subject}
          onChange={(e) => update('subject', e.target.value)}
          className={`contact-input ${kannadaFont}`}
        >
          {subjects.map((subject) => (
            <option key={subject.key} value={subject.key}>
              {t(subject.label)}
            </option>
          ))}
        </select>
        <label htmlFor="contact-subject" className={`contact-label ${kannadaFont}`}>{t('contact.subject')}</label>
        <ChevronDown className="contact-select-chevron h-4 w-4" aria-hidden="true" />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="contact-field flex-1 flex">
          <textarea rows={5} {...inputProps('message')} className="contact-input flex-1" onChange={(e) => update('message', e.target.value)} />
          <label htmlFor="contact-message" className={`contact-label ${kannadaFont}`}>{t('contact.message')}</label>
        </div>
        {errorText('message')}
      </div>

      {(status === 'sent' || status === 'mailto' || status === 'error') && (
        <p
          role="status"
          className={`flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${kannadaFont} ${
            status === 'error' ? 'bg-red-500/10 text-red-300' : 'bg-green-500/10 text-green-300'
          }`}
        >
          {status !== 'error' && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />}
          {t(status === 'sent' ? 'contact.success' : status === 'mailto' ? 'contact.mailtoOpened' : 'contact.failure')}
        </p>
      )}

      {/* Left-aligned so the floating Instagram button (bottom-right) never covers it */}
      <button
        type="submit"
        disabled={launching || status === 'sending'}
        className={`contact-send self-start ${launching ? 'is-launching' : ''} ${kannadaFont}`}
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {t('contact.sending')}
          </>
        ) : (
          <>
            {t('contact.send')}
            <Send className="contact-plane h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
