import { getPpcLeadData } from "@/lib/ppc";

export const THANK_YOU_PATH = "/thank-you";

const LOADING_BUTTON_HTML = `<span class="inline-flex items-center justify-center gap-2"><span class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true"></span><span>Submitting...</span></span>`;

function getSubmitErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Failed to submit form. Please try again.";
}

export function setFormSubmitLoading(form: HTMLFormElement, loading: boolean) {
  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (!submitBtn) return;

  if (loading) {
    if (!submitBtn.dataset.originalHtml) {
      submitBtn.dataset.originalHtml = submitBtn.innerHTML;
    }
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    submitBtn.classList.add("pointer-events-none", "opacity-80");
    submitBtn.innerHTML = LOADING_BUTTON_HTML;
    return;
  }

  submitBtn.disabled = false;
  submitBtn.removeAttribute("aria-busy");
  submitBtn.classList.remove("pointer-events-none", "opacity-80");
  if (submitBtn.dataset.originalHtml) {
    submitBtn.innerHTML = submitBtn.dataset.originalHtml;
    delete submitBtn.dataset.originalHtml;
  }
}

async function sendFormPayload(
  data: Record<string, string>,
  source?: string,
): Promise<void> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      ...getPpcLeadData(),
      source: source ?? (typeof window !== "undefined" ? window.location.pathname : "website"),
    }),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error || "Failed to submit form. Please try again.");
  }

  if (typeof window !== "undefined") {
    window.location.href = THANK_YOU_PATH;
  }
}

export async function submitLeadForm(
  form: HTMLFormElement,
  source?: string,
): Promise<void> {
  setFormSubmitLoading(form, true);

  try {
    const formData = new FormData(form);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      if (typeof value === "string") {
        data[key] = value;
      }
    });

    await sendFormPayload(data, source);
  } catch (error) {
    setFormSubmitLoading(form, false);
    throw error;
  }
}

export async function submitLeadFormData(
  data: Record<string, string | boolean | undefined>,
  source?: string,
  form?: HTMLFormElement | null,
): Promise<void> {
  if (form) {
    setFormSubmitLoading(form, true);
  }

  try {
    const payload: Record<string, string> = {};

    for (const [key, value] of Object.entries(data)) {
      if (value === undefined || value === false) continue;
      payload[key] = String(value);
    }

    await sendFormPayload(payload, source);
  } catch (error) {
    if (form) {
      setFormSubmitLoading(form, false);
    }
    throw error;
  }
}

export async function handleLeadFormSubmit(
  e: React.FormEvent<HTMLFormElement>,
  source?: string,
): Promise<void> {
  e.preventDefault();
  try {
    await submitLeadForm(e.currentTarget, source);
  } catch (error) {
    window.alert(getSubmitErrorMessage(error));
  }
}
