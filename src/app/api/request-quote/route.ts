import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const FALLBACK_RECIPIENT = "saintjohnsautorepair@gmail.com";

type QuoteRequestPayload = {
  full_name?: unknown;
  email?: unknown;
  phone?: unknown;
  vin?: unknown;
  concern?: unknown;
  preferred_contact?: unknown;
  preferred_contact_other?: unknown;
  send_copy?: unknown;
};

const sanitize = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });

const formatMultilineHtml = (value: string): string =>
  escapeHtml(value).replace(/\r?\n/g, "<br />");

const normalizePreferredContact = (
  value: string,
  otherValue: string,
): { label: string; extra?: string } => {
  const base = value ? value.toLowerCase() : "";

  if (base === "other") {
    return {
      label: otherValue ? "Other" : "Other (unspecified)",
      extra: otherValue,
    };
  }

  if (!base) {
    return { label: "Not specified" };
  }

  return { label: base.charAt(0).toUpperCase() + base.slice(1) };
};

const parseBoolean = (value: string): boolean => {
  const normalized = value.toLowerCase();
  return ["yes", "true", "on", "1"].includes(normalized);
};

export async function POST(request: Request) {
  let payload: QuoteRequestPayload;

  try {
    payload = (await request.json()) as QuoteRequestPayload;
  } catch (error) {
    return NextResponse.json(
      { message: "We couldn't read your request. Please try again." },
      { status: 400 },
    );
  }

  const fullName = sanitize(payload.full_name);
  const email = sanitize(payload.email);
  const phone = sanitize(payload.phone);
  const vin = sanitize(payload.vin);
  const concern = sanitize(payload.concern);
  const preferredContactRaw = sanitize(payload.preferred_contact);
  const preferredContactOther = sanitize(payload.preferred_contact_other);
  const sendCopyRaw = sanitize(payload.send_copy);
  const sendCopy = sendCopyRaw ? parseBoolean(sendCopyRaw) : false;

  if (!fullName || !email || !phone || !concern) {
    return NextResponse.json(
      {
        message:
          "Please complete your name, email, phone number, and vehicle concern before submitting.",
      },
      { status: 400 },
    );
  }

  const preferredContact = normalizePreferredContact(
    preferredContactRaw,
    preferredContactOther,
  );
  const submittedAt = new Date();
  const submittedAtIso = submittedAt.toISOString();
  const submittedAtLocal = submittedAt.toLocaleString("en-US", {
    hour12: true,
  });

  const textSummary = [
    `Full Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    vin ? `VIN: ${vin}` : null,
    `Preferred Contact: ${preferredContact.label}`,
    preferredContact.extra
      ? `Preferred Contact Details: ${preferredContact.extra}`
      : null,
    `Send Copy: ${sendCopy ? "Yes" : "No"}`,
    `Submitted: ${submittedAtIso}`,
    "",
    "Vehicle Concern:",
    concern,
  ]
    .filter((line): line is string => Boolean(line))
    .join("\n");

  const htmlSummary = `
    <h2>New quote request received</h2>
    <p><strong>Submitted:</strong> ${escapeHtml(
      submittedAtLocal,
    )} (${escapeHtml(submittedAtIso)})</p>
    <ul>
      <li><strong>Full Name:</strong> ${escapeHtml(fullName)}</li>
      <li><strong>Email:</strong> ${escapeHtml(email)}</li>
      <li><strong>Phone:</strong> ${escapeHtml(phone)}</li>
      ${vin ? `<li><strong>VIN:</strong> ${escapeHtml(vin)}</li>` : ""}
      <li><strong>Preferred Contact:</strong> ${escapeHtml(
        preferredContact.label,
      )}</li>
      ${preferredContact.extra
        ? `<li><strong>Preferred Contact Details:</strong> ${escapeHtml(preferredContact.extra)}</li>`
        : ""}
      <li><strong>Send Copy:</strong> ${sendCopy ? "Yes" : "No"}</li>
    </ul>
    <p><strong>Vehicle Concern</strong></p>
    <p>${formatMultilineHtml(concern)}</p>
  `;

  const smtpHost = process.env.SMTP_HOST;
  const smtpPortRaw = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecureRaw = process.env.SMTP_SECURE;
  const fromAddress =
    process.env.QUOTE_REQUEST_FROM ?? smtpUser ?? FALLBACK_RECIPIENT;
  const recipient =
    process.env.QUOTE_REQUEST_RECIPIENT ?? FALLBACK_RECIPIENT;

  if (!smtpHost || !smtpPortRaw) {
    return NextResponse.json(
      {
        message:
          "We couldn't send your request at this time. Please call +1 (904) 827-3869 for immediate assistance.",
      },
      { status: 500 },
    );
  }

  const port = Number.parseInt(smtpPortRaw, 10);
  if (Number.isNaN(port)) {
    return NextResponse.json(
      {
        message:
          "We couldn't send your request at this time. Please call +1 (904) 827-3869 for immediate assistance.",
      },
      { status: 500 },
    );
  }

  if ((smtpUser && !smtpPass) || (!smtpUser && smtpPass)) {
    return NextResponse.json(
      {
        message:
          "We couldn't send your request at this time. Please call +1 (904) 827-3869 for immediate assistance.",
      },
      { status: 500 },
    );
  }

  const secure = smtpSecureRaw
    ? smtpSecureRaw.toLowerCase() === "true"
    : port === 465;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port,
    secure,
    auth:
      smtpUser && smtpPass
        ? {
            user: smtpUser,
            pass: smtpPass,
          }
        : undefined,
  });

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: recipient,
      cc: sendCopy ? email : undefined,
      replyTo: email,
      subject: `New quote request from ${fullName}`,
      text: textSummary,
      html: htmlSummary,
    });
  } catch (error) {
    console.error("Failed to send quote request email", error);
    return NextResponse.json(
      {
        message:
          "We couldn't send your request at this time. Please call +1 (904) 827-3869 for immediate assistance.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    message: "Quote request sent successfully.",
  });
}
