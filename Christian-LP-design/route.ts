import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Lead = {
  name?: string;
  email?: string;
  phone?: string;
  bookType?: string;
  stage?: string;
  company?: string; // honeypot
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: Lead;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed request" }, { status: 400 });
  }

  // Honeypot. Real visitors never see this field, so anything in it is a bot.
  // Return 200 so the bot does not learn it was filtered.
  if (body.company) return NextResponse.json({ ok: true });

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const bookType = body.bookType?.trim() ?? "";
  const stage = body.stage?.trim() ?? "";

  if (!name || !phone || !bookType || !stage) {
    return NextResponse.json(
      { error: "Please complete every field." },
      { status: 422 },
    );
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json(
      { error: "That email address does not look right." },
      { status: 422 },
    );
  }

  const lead = {
    name,
    email,
    phone,
    bookType,
    stage,
    source: "christian-book-publishing",
    receivedAt: new Date().toISOString(),
  };

  try {
    /* -------------------------------------------------------------
       Wire up whichever of these you use. Any one is enough.

       1. Email via Resend
          await resend.emails.send({
            from: "site@stamfordpublishers.com",
            to: "leads@stamfordpublishers.com",
            subject: `Christian LP lead: ${name}`,
            text: JSON.stringify(lead, null, 2),
          });

       2. CRM webhook (HubSpot, Zoho, Pipedrive, Zapier)
          await fetch(process.env.LEAD_WEBHOOK_URL!, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lead),
          });

       3. Google Ads offline conversion
          Push a gclid captured from the URL alongside the lead.
    ------------------------------------------------------------- */

    if (process.env.LEAD_WEBHOOK_URL) {
      await fetch(process.env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } else {
      console.info("[christian-lead]", lead);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[christian-lead] delivery failed", err);
    return NextResponse.json(
      { error: "We could not record that. Please call us." },
      { status: 500 },
    );
  }
}
