import { site } from '@/shared/data/site';

// Contact details come from src/data/site.json; this file builds links and sends the form.

export const CONTACT_EMAIL = site.contact.email;
export const CONTACT_ADDRESS = site.contact.address;
export const CONTACT_SHORT_ADDRESS = site.contact.shortAddress;

const MAP_QUERY = site.contact.mapSearch;
export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
export const MAP_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

/**
 * Where the form sends messages (set "formEndpoint" in site.json). The site has no backend, so:
 * - Empty: the visitor's email app opens with the message filled in (mailto).
 * - Or a form-service endpoint that accepts JSON POSTs, e.g. Formspree
 *   ("https://formspree.io/f/<form-id>"), and messages are sent directly.
 */
export const FORM_ENDPOINT = site.contact.formEndpoint;

export type SubjectKey = 'general' | 'join' | 'collab' | 'other';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string; // readable subject text
  message: string;
}

/** Sends the message. Returns 'sent' when delivered by the endpoint, 'mailto' when the email app was opened. */
export async function submitMessage(data: ContactMessage): Promise<'sent' | 'mailto'> {
  if (FORM_ENDPOINT) {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Form endpoint returned ${response.status}`);
    return 'sent';
  }

  const body = `${data.message}\n\n— ${data.name} (${data.email})`;
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `[Website] ${data.subject}`,
  )}&body=${encodeURIComponent(body)}`;
  return 'mailto';
}

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
