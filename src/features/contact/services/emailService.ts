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
 * Sends a contact message to the Kannada Koota administration (vikasnnaik201@gmail.com)
 * via the Resend API backend endpoint.
 */
export async function sendContactNotification(
  payload: ContactEmailPayload
): Promise<SendEmailResponse> {
  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errMsg =
        data?.message || data?.error || `Failed to send email (HTTP ${res.status})`;
      return { success: false, error: errMsg };
    }

    return { success: true, id: data.id };
  } catch (err: unknown) {
    console.error("sendContactNotification error:", err);
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Network error while connecting to email service.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
