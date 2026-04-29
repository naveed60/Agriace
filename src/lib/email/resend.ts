import { randomUUID } from "node:crypto";
import { setDefaultResultOrder } from "node:dns";

type SendEmailInput = {
  to: string;
  subject: string;
  text: string;
  html: string;
  tags?: Array<{ name: string; value: string }>;
};

// Resend returns { id: "..." } on success and
// { statusCode, name, message } on error — both at the top level.
type ResendSendResponse = {
  id?: string;
  statusCode?: number;
  name?: string;
  message?: string;
};

export type SendEmailResult = {
  ok: boolean;
  id: string | null;
};

const DEFAULT_RESEND_API_URL = "https://api.resend.com/emails";
const DEFAULT_FROM_EMAIL = "AgriAce Fertilizers <noreply@agriaces.com>";
const DEFAULT_TIMEOUT_MS = 8_000;
const DEFAULT_MAX_RETRIES = 2;
const DEFAULT_DNS_RESULT_ORDER = "verbatim";
let hasConfiguredDnsResultOrder = false;

function parseNumberEnv(
  value: string | undefined,
  fallback: number,
  { min, max }: { min: number; max: number }
): number {
  if (!value) return fallback;

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
    return fallback;
  }

  return Math.floor(parsed);
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function configureDnsResultOrderForMailer(): void {
  if (hasConfiguredDnsResultOrder) return;
  hasConfiguredDnsResultOrder = true;

  const configuredOrder = process.env.RESEND_DNS_RESULT_ORDER;
  const dnsResultOrder =
    configuredOrder === "ipv4first" || configuredOrder === "verbatim"
      ? configuredOrder
      : DEFAULT_DNS_RESULT_ORDER;

  try {
    setDefaultResultOrder(dnsResultOrder);
    console.info("[Mailer] dns.result_order.configured", { dnsResultOrder });
  } catch (error) {
    console.warn("[Mailer] dns.result_order.configure_failed", {
      dnsResultOrder,
      error,
    });
  }
}

function getErrorCode(error: unknown): string | undefined {
  if (typeof error !== "object" || error === null) return undefined;
  const record = error as Record<string, unknown>;
  const directCode = record.code;
  if (typeof directCode === "string") return directCode;

  const cause = record.cause;
  if (typeof cause === "object" && cause !== null) {
    const causeCode = (cause as Record<string, unknown>).code;
    if (typeof causeCode === "string") return causeCode;
  }

  return undefined;
}

function isRetryableStatus(status: number): boolean {
  return status === 408 || status === 429 || status >= 500;
}

function sanitizeEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "***";
  if (local.length < 3) return `***@${domain}`;
  return `${local.slice(0, 2)}***@${domain}`;
}

function isErrorPayload(payload: ResendSendResponse | null): boolean {
  if (!payload) return false;
  // Resend error responses include a `message` and `name`, never an `id`.
  return Boolean(payload.message) && !payload.id;
}

export async function sendEmailWithResend(
  input: SendEmailInput
): Promise<SendEmailResult> {
  configureDnsResultOrderForMailer();

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("[Mailer] resend.send.failed", {
      reason: "RESEND_API_KEY_MISSING",
      to: sanitizeEmail(input.to),
      subject: input.subject,
    });
    return { ok: false, id: null };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL ?? DEFAULT_FROM_EMAIL;
  const resendApiUrl = process.env.RESEND_API_URL ?? DEFAULT_RESEND_API_URL;
  const timeoutMs = parseNumberEnv(process.env.RESEND_TIMEOUT_MS, DEFAULT_TIMEOUT_MS, {
    min: 1_000,
    max: 30_000,
  });
  const maxRetries = parseNumberEnv(process.env.RESEND_MAX_RETRIES, DEFAULT_MAX_RETRIES, {
    min: 0,
    max: 5,
  });
  const requestId = randomUUID();
  const totalAttempts = maxRetries + 1;

  for (let attempt = 1; attempt <= totalAttempts; attempt += 1) {
    try {
      const response = await fetch(resendApiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [input.to],
          subject: input.subject,
          text: input.text,
          html: input.html,
          tags: input.tags,
        }),
        signal: AbortSignal.timeout(timeoutMs),
      });

      const payload = (await response
        .json()
        .catch(() => null)) as ResendSendResponse | null;

      const looksLikeError = !response.ok || isErrorPayload(payload);

      if (looksLikeError) {
        const retryable = isRetryableStatus(response.status);
        const isLastAttempt = attempt >= totalAttempts;
        const errorMessage = payload?.message ?? "Unknown Resend API error";

        if (retryable && !isLastAttempt) {
          console.warn("[Mailer] resend.send.retry", {
            requestId,
            attempt,
            totalAttempts,
            status: response.status,
            to: sanitizeEmail(input.to),
            subject: input.subject,
            error: errorMessage,
          });
          await wait(300 * attempt);
          continue;
        }

        console.error("[Mailer] resend.send.failed", {
          requestId,
          attempt,
          totalAttempts,
          status: response.status,
          to: sanitizeEmail(input.to),
          subject: input.subject,
          error: errorMessage,
          errorName: payload?.name,
          retryable,
        });
        return { ok: false, id: null };
      }

      const messageId = payload?.id ?? null;

      console.info("[Mailer] resend.send.success", {
        requestId,
        attempt,
        totalAttempts,
        messageId,
        to: sanitizeEmail(input.to),
        subject: input.subject,
      });

      return { ok: true, id: messageId };
    } catch (error) {
      const code = getErrorCode(error);
      const isLastAttempt = attempt >= totalAttempts;

      if (!isLastAttempt) {
        console.warn("[Mailer] resend.send.retry", {
          requestId,
          attempt,
          totalAttempts,
          to: sanitizeEmail(input.to),
          subject: input.subject,
          timeoutMs,
          errorCode: code ?? "UNKNOWN",
          error,
        });
        await wait(300 * attempt);
        continue;
      }

      console.error("[Mailer] resend.send.failed", {
        requestId,
        attempt,
        totalAttempts,
        to: sanitizeEmail(input.to),
        subject: input.subject,
        timeoutMs,
        errorCode: code ?? "UNKNOWN",
        error,
      });
      return { ok: false, id: null };
    }
  }

  return { ok: false, id: null };
}