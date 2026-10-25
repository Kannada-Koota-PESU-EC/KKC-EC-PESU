export interface ContactEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SendEmailResponse {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Sends a contact message to the Kannada Koota administration (vikasnnaik201@gmail.com).
 * First attempts the /api/send-email backend endpoint (Resend API).
 * If the host is static (returns 404) or unavailable, seamlessly falls back
 * to direct browser submission to vikasnnaik201@gmail.com.
 */
export async function sendContactNotification(
  payload: ContactEmailPayload
): Promise<SendEmailResponse> {
  const targetEmail = "vikasnnaik201@gmail.com";

  // 1. Primary: Try the server / Worker API endpoint (Resend)
  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      return { success: true, id: data.id || "resend-success" };
    }

    // If server returned an intentional non-404 error (e.g. 400 validation), log and check
    if (res.status !== 404) {
      const data = await res.json().catch(() => ({}));
      const errMsg = data?.error || data?.message || `API error (HTTP ${res.status})`;
      console.warn("Primary email API returned non-404 error:", errMsg);
    }
  } catch (err: unknown) {
    console.warn("Primary /api/send-email endpoint unreachable:", err);
  }

  // 2. Secondary Fallback: FormSubmit direct client-side delivery to target email
  try {
    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `[Kannada Koota Website] Say Hello: ${payload.subject} (from ${payload.name})`,
        name: payload.name,
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
      }),
    });

    const fsData = await formSubmitRes.json().catch(() => ({}));
    if (formSubmitRes.ok && (fsData.success === "true" || fsData.success === true)) {
      return { success: true, id: "formsubmit-success" };
    }
  } catch (fsErr: unknown) {
    console.warn("FormSubmit fallback unreachable:", fsErr);
  }

  // 3. If neither online endpoint succeeded, return indicator for mailto fallback
  return {
    success: false,
    error: "Endpoints unavailable on static host; initiating email client fallback.",
  };
}
