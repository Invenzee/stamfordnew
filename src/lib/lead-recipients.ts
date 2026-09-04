/** Hardcoded lead inboxes. Do not read these from env. */
export const LEAD_RECIPIENTS = [
  "sales@stamfordpublishers.com",
  "absarmustajab99@gmail.com",
] as const;

export const LEAD_TO = LEAD_RECIPIENTS.join(", ");
