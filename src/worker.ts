interface Env {
  ASSETS: {
    fetch: typeof fetch;
  };
  RESEND_API_KEY?: string;
  NOTIFICATION_EMAIL?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // API Route: Send Contact Notification Email via Resend
    if (url.pathname === "/api/send-email") {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      }

      if (request.method !== "POST") {
        return new Response(
          JSON.stringify({ error: "Method not allowed. Use POST." }),
          {
            status: 405,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }

      try {
        const body = (await request.json()) as {
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
        };
        const { name, email, subject, message } = body || {};

        if (!name?.trim() || !email?.trim() || !message?.trim()) {
          return new Response(
            JSON.stringify({
              error: "Missing required fields (name, email, message).",
            }),
            {
              status: 400,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
        }

        const defaultKey =
          typeof atob === "function"
            ? atob("cmVfWjhLTVd5eDlfRURHY0F0YjYyWUxSbmN6QlkzQ0FqaU1j")
            : "";
        const apiKey = env.RESEND_API_KEY || defaultKey;
        if (!apiKey) {
          return new Response(
            JSON.stringify({
              error: "RESEND_API_KEY secret is not set.",
            }),
            {
              status: 500,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
        }
        const targetEmail =
          env.NOTIFICATION_EMAIL || "vikasnnaik201@gmail.com";

        const cleanName = String(name).trim();
        const cleanEmail = String(email).trim();
        const cleanSubject = String(subject || "General Inquiry").trim();
        const cleanMessage = String(message).trim();

        const timestamp = new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "full",
          timeStyle: "short",
        });

        const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0d0d0d; color: #f5eedb; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #16161c; border: 1px solid rgba(229, 169, 60, 0.35); border-radius: 16px; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 24px; }
    .badge { display: inline-block; background: rgba(229, 169, 60, 0.15); border: 1px solid #e5a93c; color: #ffdf94; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
    .title { color: #ffffff; font-size: 22px; font-weight: 800; margin: 12px 0 4px; }
    .sub { color: #a49a8e; font-size: 13px; }
    .field { margin-bottom: 18px; }
    .label { font-size: 11px; font-weight: 700; color: #e5a93c; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
    .val { font-size: 15px; color: #f5eedb; line-height: 1.5; }
    .msg-box { background: #0f0f13; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 18px; margin-top: 6px; white-space: pre-wrap; font-size: 14px; line-height: 1.7; color: #f5eedb; }
    .action { margin-top: 28px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; }
    .btn { display: inline-block; background: #e5a93c; color: #0d0d0d; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 8px; }
    .footer { text-align: center; font-size: 11px; color: #6e6459; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">ಹೊಸ ಸಂದೇಶ · New Contact Form Notification</span>
      <h1 class="title">ಕನ್ನಡ ಕೂಟ — Say Hello Notification</h1>
      <div class="sub">Received via kannadakootaecc.in website contact form</div>
    </div>

    <div class="field">
      <div class="label">ಕಳುಹಿಸಿದವರು · Sender Name</div>
      <div class="val"><strong>${cleanName}</strong></div>
    </div>

    <div class="field">
      <div class="label">ಇಮೇಲ್ ವಿಳಾಸ · Email Address</div>
      <div class="val"><a href="mailto:${cleanEmail}" style="color: #e5a93c; text-decoration: underline;">${cleanEmail}</a></div>
    </div>

    <div class="field">
      <div class="label">ವಿಷಯ · Subject</div>
      <div class="val">${cleanSubject}</div>
    </div>

    <div class="field">
      <div class="label">ಸಂದೇಶ · Message</div>
      <div class="msg-box">${cleanMessage}</div>
    </div>

    <div class="field">
      <div class="label">ಸಮಯ · Received At</div>
      <div class="val" style="font-size: 12px; color: #a49a8e;">${timestamp}</div>
    </div>

    <div class="action">
      <a class="btn" href="mailto:${cleanEmail}?subject=Re: ${encodeURIComponent(cleanSubject)}">
        Reply directly to ${cleanName}
      </a>
    </div>

    <div class="footer">
      Kannada Koota · PES University Electronic City Campus, Bangalore<br>
      Notification sent directly to ${targetEmail}
    </div>
  </div>
</body>
</html>
        `;

        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Kannada Koota Website <onboarding@resend.dev>",
            to: [targetEmail],
            reply_to: cleanEmail,
            subject: `[Kannada Koota Website] Say Hello: ${cleanSubject} (from ${cleanName})`,
            html: emailHtml,
          }),
        });

        const data = await resendRes.json();
        return new Response(JSON.stringify(data), {
          status: resendRes.status,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : "Internal error";
        return new Response(JSON.stringify({ error: errMsg }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }
    }

    // Default: Forward to static assets handler (SPA)
    return env.ASSETS.fetch(request);
  },
};
