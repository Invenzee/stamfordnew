import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string>;
    const { source, ...fields } = body;
    const ppcKeys = [
      "gclid",
      "gbraid",
      "wbraid",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "utm_id",
      "campaignid",
      "adgroupid",
      "keyword",
      "matchtype",
      "device",
      "network",
      "landing_page",
      "referrer",
      "current_page",
    ];
    const leadFields = Object.fromEntries(
      Object.entries(fields).filter(([key]) => !ppcKeys.includes(key)),
    );
    const ppcFields = Object.fromEntries(
      Object.entries(fields).filter(([key]) => ppcKeys.includes(key) && fields[key]?.trim()),
    );

    const to = process.env.CONTACT_EMAIL || "info@stamfordpublishers.com";
    const user = process.env.SMTP_USER || to;
    const pass = process.env.SMTP_PASS?.replace(/\s/g, "");

    if (!pass) {
      return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
    }

    const entries = Object.entries(leadFields).filter(([, value]) => value?.trim());
    if (entries.length === 0) {
      return NextResponse.json({ error: "No form data received." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user, pass },
    });

    const ppcEntries = Object.entries(ppcFields);
    const textLines = [
      ...entries.map(([key, value]) => `${formatLabel(key)}: ${value}`),
      ...(ppcEntries.length
        ? ["", "PPC / Attribution", ...ppcEntries.map(([key, value]) => `${formatLabel(key)}: ${value}`)]
        : []),
    ].join("\n");
    const htmlRows = [
      ...entries.map(
        ([key, value]) =>
          `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top;">${escapeHtml(formatLabel(key))}</td><td style="padding:8px 12px;">${escapeHtml(value)}</td></tr>`,
      ),
      ...(ppcEntries.length
        ? [
            `<tr><td colspan="2" style="padding:16px 12px 8px;font-weight:700;border-top:1px solid #ddd;">PPC / Attribution</td></tr>`,
            ...ppcEntries.map(
              ([key, value]) =>
                `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top;">${escapeHtml(formatLabel(key))}</td><td style="padding:8px 12px;">${escapeHtml(value)}</td></tr>`,
            ),
          ]
        : []),
    ].join("");

    const replyTo =
      fields.email ||
      fields.Email ||
      fields.fullName ||
      fields.name ||
      undefined;

    const pageSource = source?.trim() || "Website";
    const subject = `New Lead — ${pageSource}`;

    await transporter.sendMail({
      from: `"Stamford Publishers" <${user}>`,
      to,
      replyTo,
      subject,
      text: `New form submission from ${pageSource}\n\n${textLines}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6;">
          <h2 style="margin:0 0 12px;">New Form Submission</h2>
          <p style="margin:0 0 20px;"><strong>Source:</strong> ${escapeHtml(pageSource)}</p>
          <table style="border-collapse:collapse;width:100%;max-width:640px;">
            <tbody>${htmlRows}</tbody>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again later." },
      { status: 500 },
    );
  }
}
