import { sendEmailWithResend } from "@/lib/email/resend";

const DEFAULT_CONTACT_RECIPIENT = "info@agriaces.com";

type ContactEmailInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildContactEmail(input: ContactEmailInput) {
  const subject = `[Contact Form] ${input.subject}`;
  const receivedAtIso = new Date().toISOString();
  const text = [
    "New contact form submission received.",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Subject: ${input.subject}`,
    `Received At: ${receivedAtIso}`,
    "",
    "Message:",
    input.message,
  ].join("\n");

  const html = `
  <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937">
    <h2 style="margin:0 0 12px">New Contact Form Submission</h2>
    <p style="margin:0 0 6px"><strong>Name:</strong> ${escapeHtml(input.name)}</p>
    <p style="margin:0 0 6px"><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    <p style="margin:0 0 6px"><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>
    <p style="margin:0 0 6px"><strong>Received At:</strong> ${escapeHtml(receivedAtIso)}</p>
    <p style="margin:16px 0 6px"><strong>Message:</strong></p>
    <p style="white-space:pre-wrap;margin:0">${escapeHtml(input.message)}</p>
  </div>
  `;

  return { subject, text, html };
}

export async function sendContactEmail(input: ContactEmailInput): Promise<boolean> {
  const recipient = process.env.CONTACT_INBOX_EMAIL ?? DEFAULT_CONTACT_RECIPIENT;
  const message = buildContactEmail(input);

  const result = await sendEmailWithResend({
    to: recipient,
    subject: message.subject,
    text: message.text,
    html: message.html,
    tags: [
      { name: "type", value: "contact_form" },
      { name: "sender_email", value: input.email.toLowerCase() },
    ],
  });

  if (!result.id) {
    console.error("[Contact] contact-email.failed", {
      recipient,
      senderEmail: input.email.toLowerCase(),
    });
    return false;
  }

  console.info("[Contact] contact-email.sent", {
    recipient,
    senderEmail: input.email.toLowerCase(),
    messageId: result.id,
  });
  return true;
}
