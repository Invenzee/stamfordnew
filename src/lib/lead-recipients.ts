const DEFAULT_LEAD_RECIPIENTS = [
  "info@stamfordpublishers.com",
  "absarmustajab99@gmail.com",
];

function parseRecipients(value?: string) {
  if (!value?.trim()) return DEFAULT_LEAD_RECIPIENTS;

  const parsed = value
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  return parsed.length > 0 ? parsed : DEFAULT_LEAD_RECIPIENTS;
}

export const LEAD_RECIPIENTS = parseRecipients(process.env.CONTACT_EMAIL);
export const LEAD_TO = LEAD_RECIPIENTS.join(", ");
