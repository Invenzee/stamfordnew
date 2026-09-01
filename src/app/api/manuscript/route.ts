import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const maxDuration = 60;

const MAX_FILE_BYTES = 15 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([
  ".pdf",
  ".doc",
  ".docx",
  ".rtf",
  ".odt",
  ".txt",
]);

const FIELD_ORDER = [
  "fullName",
  "penName",
  "email",
  "phone",
  "website",
  "streetAddress",
  "city",
  "state",
  "zip",
  "country",
  "bookTitle",
  "genre",
  "bookType",
  "targetAudience",
  "wordCount",
  "previouslyPublished",
  "servicesNeeded",
  "synopsis",
  "additionalNotes",
];

const LABEL_OVERRIDES: Record<string, string> = {
  fullName: "Full Name",
  penName: "Pen Name",
  email: "Email",
  phone: "Phone",
  website: "Website",
  streetAddress: "Street Address",
  city: "City",
  state: "State / Province",
  zip: "ZIP / Postal Code",
  country: "Country",
  bookTitle: "Book Title",
  genre: "Genre",
  bookType: "Book Type",
  targetAudience: "Target Audience",
  wordCount: "Approximate Word Count",
  previouslyPublished: "Previously Published",
  servicesNeeded: "Services Needed",
  synopsis: "Synopsis",
  additionalNotes: "Additional Notes",
};

function formatLabel(key: string): string {
  return (
    LABEL_OVERRIDES[key] ??
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .trim()
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fileExtension(name: string): string {
  const index = name.lastIndexOf(".");
  return index >= 0 ? name.slice(index).toLowerCase() : "";
}

export async function POST(request: Request) {
  try {
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { error: "Please complete the required author and book details." },
        { status: 400 },
      );
    }
    const fields: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      if (typeof value !== "string" || key === "manuscript") continue;
      const trimmed = value.trim();
      if (!trimmed) continue;
      if (fields[key]) {
        fields[key] = `${fields[key]}, ${trimmed}`;
      } else {
        fields[key] = trimmed;
      }
    }

    const fullName = fields.fullName;
    const email = fields.email;
    const phone = fields.phone;
    const bookTitle = fields.bookTitle;

    if (!fullName || !email || !phone || !bookTitle) {
      return NextResponse.json(
        { error: "Please complete the required author and book details." },
        { status: 400 },
      );
    }

    const manuscript = formData.get("manuscript");
    if (!(manuscript instanceof File) || manuscript.size === 0) {
      return NextResponse.json(
        { error: "Please upload your manuscript file." },
        { status: 400 },
      );
    }

    if (manuscript.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: "Manuscript files must be 15MB or smaller." },
        { status: 400 },
      );
    }

    const extension = fileExtension(manuscript.name);
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      return NextResponse.json(
        {
          error:
            "Please upload a PDF, Word, RTF, ODT, or TXT manuscript file.",
        },
        { status: 400 },
      );
    }

    const to = process.env.CONTACT_EMAIL || "info@stamfordpublishers.com";
    const user = process.env.SMTP_USER || to;
    const pass = process.env.SMTP_PASS?.replace(/\s/g, "");

    if (!pass) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user, pass },
    });

    const orderedKeys = [
      ...FIELD_ORDER.filter((key) => fields[key]),
      ...Object.keys(fields).filter((key) => !FIELD_ORDER.includes(key)),
    ];

    const textLines = orderedKeys
      .map((key) => `${formatLabel(key)}: ${fields[key]}`)
      .join("\n");

    const htmlRows = orderedKeys
      .map(
        (key) =>
          `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top;width:220px;border-bottom:1px solid #eee;">${escapeHtml(formatLabel(key))}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;white-space:pre-wrap;">${escapeHtml(fields[key])}</td></tr>`,
      )
      .join("");

    const fileBuffer = Buffer.from(await manuscript.arrayBuffer());
    const firstName = fullName.split(" ")[0] || "there";

    await transporter.sendMail({
      from: `"Stamford Publishers" <${user}>`,
      to,
      replyTo: email,
      subject: `New Manuscript Submission — ${bookTitle} — ${fullName}`,
      text: `A new manuscript was submitted from the website.\n\n${textLines}\n\nManuscript file: ${manuscript.name} (${Math.round(manuscript.size / 1024)} KB)`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#111;line-height:1.6;">
          <h2 style="margin:0 0 8px;">New Manuscript Submission</h2>
          <p style="margin:0 0 20px;">A complete manuscript package was submitted on the website.</p>
          <table style="border-collapse:collapse;width:100%;max-width:720px;">
            <tbody>${htmlRows}</tbody>
          </table>
          <p style="margin:20px 0 0;"><strong>Attached manuscript:</strong> ${escapeHtml(manuscript.name)} (${Math.round(manuscript.size / 1024)} KB)</p>
        </div>
      `,
      attachments: [
        {
          filename: manuscript.name,
          content: fileBuffer,
          contentType: manuscript.type || undefined,
        },
      ],
    });

    await transporter.sendMail({
      from: `"Stamford Publishers" <${user}>`,
      to: email,
      subject: "Thank you — we received your manuscript",
      text: `Dear ${firstName},\n\nThank you for submitting “${bookTitle}” to Stamford Publishers. We have received your manuscript and author details, and a publishing specialist will review your materials and contact you shortly.\n\nIf you have any questions in the meantime, call us at (562) 573-2551 or reply to this email.\n\nWarm regards,\nStamford Publishers\n640 St Paul Ave, Los Angeles, CA 90017\nwww.stamfordpublishers.com`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#111;line-height:1.7;max-width:640px;">
          <p>Dear ${escapeHtml(firstName)},</p>
          <p>Thank you for submitting <strong>${escapeHtml(bookTitle)}</strong> to Stamford Publishers. We have received your manuscript and author details.</p>
          <p>A publishing specialist will review your materials and contact you shortly to discuss next steps.</p>
          <p>If you have any questions in the meantime, call us at <a href="tel:+15625732551">(562) 573-2551</a> or reply to this email.</p>
          <p style="margin:28px 0 0;">Warm regards,<br/><strong>Stamford Publishers</strong><br/>640 St Paul Ave, Los Angeles, CA 90017</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Manuscript submission error:", error);
    return NextResponse.json(
      { error: "Failed to send your manuscript. Please try again later." },
      { status: 500 },
    );
  }
}
