"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  BookOpen,
  Check,
  FileText,
  MapPin,
  Upload,
  User,
} from "lucide-react";
import { getPpcLeadData } from "@/lib/ppc";
import { setFormSubmitLoading, THANK_YOU_PATH } from "@/lib/submit-form";

const FIELD_CLASS =
  "w-full rounded-lg border border-border bg-white px-3 py-2.5 font-body text-sm text-black placeholder:text-black/40 focus:border-secondary focus:outline-none";

const MAX_FILE_BYTES = 15 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".rtf", ".odt", ".txt"];

const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Memoir / Autobiography",
  "Children's Book",
  "Young Adult",
  "Poetry",
  "Faith / Spiritual",
  "Business",
  "Self-Help",
  "Other",
];

const BOOK_TYPES = [
  "Novel",
  "Short story collection",
  "Picture book",
  "Educational / textbook",
  "Poetry collection",
  "Workbook / journal",
  "Other",
];

const SERVICES = [
  "Ghostwriting",
  "Editing & Proofreading",
  "Cover Design",
  "Publishing",
  "Book Marketing",
  "Illustrations",
  "Audiobook",
  "Author Website",
];

function SectionHeading({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: string;
  icon: typeof User;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-4 border-b border-border pb-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <p className="font-body text-[11px] font-bold tracking-[0.2em] text-highlight uppercase">
          Section {number}
        </p>
        <h2 className="mt-1 font-heading text-2xl font-semibold text-heading">
          {title}
        </h2>
        <p className="mt-1 font-body text-sm text-black/60">{description}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  required,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block font-body text-xs font-bold text-black">
        {label}
        {required ? <span className="text-secondary"> *</span> : null}
      </label>
      {children}
    </div>
  );
}

export default function ManuscriptForm() {
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");

  function validateFile(file: File | undefined) {
    if (!file) {
      setFileName("");
      setFileError("Please upload your manuscript file.");
      return false;
    }

    const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setFileError("Please upload a PDF, Word, RTF, ODT, or TXT file.");
      return false;
    }
    if (file.size > MAX_FILE_BYTES) {
      setFileError("Manuscript files must be 15MB or smaller.");
      return false;
    }

    setFileName(file.name);
    setFileError("");
    return true;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("manuscript");

    if (!(file instanceof File) || !validateFile(file)) {
      return;
    }

    const services = formData.getAll("servicesNeeded").filter(
      (value): value is string => typeof value === "string" && value.trim() !== "",
    );
    formData.delete("servicesNeeded");
    if (services.length) {
      formData.set("servicesNeeded", services.join(", "));
    }

    for (const [key, value] of Object.entries(getPpcLeadData())) {
      if (value) formData.set(key, value);
    }

    setFormSubmitLoading(form, true);

    try {
      const res = await fetch("/api/manuscript", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "Failed to submit your manuscript.");
      }

      window.location.href = THANK_YOU_PATH;
    } catch (error) {
      setFormSubmitLoading(form, false);
      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to submit your manuscript. Please try again.",
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <SectionHeading
          number="01"
          icon={User}
          title="Author Details"
          description="Tell us who you are so our team can reach you with a personal response."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full Name" name="fullName" required>
            <input id="fullName" name="fullName" type="text" required className={FIELD_CLASS} />
          </Field>
          <Field label="Pen Name" name="penName">
            <input
              id="penName"
              name="penName"
              type="text"
              placeholder="If different from your legal name"
              className={FIELD_CLASS}
            />
          </Field>
          <Field label="Email" name="email" required>
            <input id="email" name="email" type="email" required className={FIELD_CLASS} />
          </Field>
          <Field label="Phone" name="phone" required>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="(562) 573-2551"
              className={FIELD_CLASS}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Website or Social Profile" name="website">
              <input
                id="website"
                name="website"
                type="text"
                placeholder="https://"
                className={FIELD_CLASS}
              />
            </Field>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <SectionHeading
          number="02"
          icon={MapPin}
          title="Author Address"
          description="Used for contracts, royalty statements, and printed copies when you publish with us."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Street Address" name="streetAddress" required>
              <input
                id="streetAddress"
                name="streetAddress"
                type="text"
                required
                className={FIELD_CLASS}
              />
            </Field>
          </div>
          <Field label="City" name="city" required>
            <input id="city" name="city" type="text" required className={FIELD_CLASS} />
          </Field>
          <Field label="State / Province" name="state" required>
            <input id="state" name="state" type="text" required className={FIELD_CLASS} />
          </Field>
          <Field label="ZIP / Postal Code" name="zip" required>
            <input id="zip" name="zip" type="text" required className={FIELD_CLASS} />
          </Field>
          <Field label="Country" name="country" required>
            <input
              id="country"
              name="country"
              type="text"
              required
              defaultValue="United States"
              className={FIELD_CLASS}
            />
          </Field>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <SectionHeading
          number="03"
          icon={BookOpen}
          title="Book Details"
          description="A few facts about the project help us assign the right editor and publishing path."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Book Title" name="bookTitle" required>
              <input
                id="bookTitle"
                name="bookTitle"
                type="text"
                required
                placeholder="Working title is fine"
                className={FIELD_CLASS}
              />
            </Field>
          </div>
          <Field label="Genre" name="genre" required>
            <select id="genre" name="genre" required defaultValue="" className={FIELD_CLASS}>
              <option value="" disabled>
                Select a genre
              </option>
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Book Type" name="bookType" required>
            <select id="bookType" name="bookType" required defaultValue="" className={FIELD_CLASS}>
              <option value="" disabled>
                Select a type
              </option>
              {BOOK_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Target Audience" name="targetAudience">
            <input
              id="targetAudience"
              name="targetAudience"
              type="text"
              placeholder="e.g. Adult readers, ages 8–12, first-time entrepreneurs"
              className={FIELD_CLASS}
            />
          </Field>
          <Field label="Approximate Word Count" name="wordCount">
            <input
              id="wordCount"
              name="wordCount"
              type="text"
              placeholder="e.g. 65,000"
              className={FIELD_CLASS}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Have you published before?" name="previouslyPublished">
              <select
                id="previouslyPublished"
                name="previouslyPublished"
                defaultValue="No"
                className={FIELD_CLASS}
              >
                <option value="No">No, this is my first book</option>
                <option value="Yes">Yes, I have published before</option>
              </select>
            </Field>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <SectionHeading
          number="04"
          icon={FileText}
          title="Manuscript Details"
          description="Share a short synopsis and the services you would like us to consider."
        />
        <div className="space-y-5">
          <Field label="Synopsis" name="synopsis" required>
            <textarea
              id="synopsis"
              name="synopsis"
              required
              rows={6}
              placeholder="Summarize the story or subject of the book, and where the manuscript currently stands."
              className={`${FIELD_CLASS} resize-y`}
            />
          </Field>

          <fieldset>
            <legend className="mb-3 block font-body text-xs font-bold text-black">
              Services Needed
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {SERVICES.map((service) => (
                <label
                  key={service}
                  className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 px-3 py-2.5 font-body text-sm text-black"
                >
                  <input
                    type="checkbox"
                    name="servicesNeeded"
                    value={service}
                    className="h-4 w-4 accent-[#e62e56]"
                  />
                  {service}
                </label>
              ))}
            </div>
          </fieldset>

          <Field label="Additional Notes" name="additionalNotes">
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              rows={4}
              placeholder="Deadlines, series plans, illustration notes, or anything else we should know."
              className={`${FIELD_CLASS} resize-y`}
            />
          </Field>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <SectionHeading
          number="05"
          icon={Upload}
          title="Manuscript Upload"
          description="Attach the current draft. PDF and Word files up to 15MB are accepted."
        />
        <label
          htmlFor="manuscript"
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/40 px-6 py-10 text-center transition-colors hover:border-secondary"
        >
          <Upload className="h-8 w-8 text-secondary" aria-hidden="true" />
          <span className="mt-3 font-heading text-lg font-semibold text-heading">
            {fileName || "Choose a manuscript file"}
          </span>
          <span className="mt-1 font-body text-sm text-black/55">
            PDF, DOC, DOCX, RTF, ODT, or TXT · 15MB max
          </span>
          <input
            id="manuscript"
            name="manuscript"
            type="file"
            required
            accept=".pdf,.doc,.docx,.rtf,.odt,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            onChange={(event) => validateFile(event.target.files?.[0])}
          />
        </label>
        {fileError ? (
          <p className="mt-3 font-body text-sm text-secondary">{fileError}</p>
        ) : null}

        <p className="mt-5 font-body text-xs leading-relaxed text-black/50">
          By submitting, you confirm that you own the rights to this work and that Stamford
          Publishers may review the file for quoting and editorial assessment. We do not share
          manuscripts with third parties.
        </p>
      </section>

      <button type="submit" className="btn btn-primary btn-submit max-w-md">
        <Check className="h-4 w-4" aria-hidden="true" />
        Submit Your Manuscript
      </button>
    </form>
  );
}
