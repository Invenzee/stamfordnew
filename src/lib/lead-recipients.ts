/** Hardcoded lead inboxes. Do not read these from env. */
export const LEAD_RECIPIENTS = [
  "info@stamfordpublishers.com",
  "absarmustajab99@gmail.com",
] as const;

export const LEAD_TO = LEAD_RECIPIENTS.join(", ");
