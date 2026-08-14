import type { Metadata } from "next";
import Link from "next/link";
import PolicyContent from "@/components/PolicyContent";
import PolicyHero from "@/components/PolicyHero";

export const metadata: Metadata = {
  title: "Refund Policy | Stamford Publishers",
  description:
    "Understand Stamford Publishers refund terms for professional publishing, writing, editing, design, and marketing services.",
};

export default function RefundPolicyPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PolicyHero title="Refund Policy" />
      <PolicyContent>
        <p>
          At Stamford Publishers, we provide professional, project-based publishing
          services tailored to each author&apos;s needs. Because our work is
          custom and begins once a project is confirmed, this Refund Policy
          explains how refund requests are reviewed and processed. This policy
          should be read together with our{" "}
          <Link href="/terms-of-service">Terms &amp; Conditions</Link>.
        </p>

        <h2>General Refund Policy</h2>
        <p>
          Refund requests are reviewed based on the status of the project and the
          services already completed. Once work has started, partial or full
          refunds may not be available depending on the progress made. No refund
          will be issued after final approval, delivery of completed work, or
          completion of the agreed service. Transactional charges may be
          deducted from any approved refund.
        </p>

        <h2>Refund Procedure</h2>
        <p>
          Your refund will be handled after the deduction of transactional
          charges, which are $150 or 10% of the purchase price, whichever is
          smaller, as long as you request a full refund before submitting your
          work.
        </p>
        <ul>
          <li>
            After the purchase but before 90 calendar days have passed, no
            refunds will be issued.
          </li>
          <li>
            Once the order is paid for, we do not automatically refund the
            services. Therefore, the client is not entitled to a refund for
            &ldquo;Change of Mind,&rdquo; and Stamford Publishers is not
            required to offer one.
          </li>
          <li>
            75% of the purchase price must be paid once your manuscript has been
            submitted but before design work starts. Design work includes, but
            is not limited to, formatting, editing, image arrangement,
            corrections, resizing, and pre-production.
          </li>
          <li>
            50% of the purchase price applies once design work starts but before
            final approval.
          </li>
          <li>
            No refund will be made after your final approval of the work.
          </li>
          <li>
            Within 7 days following the completion of your order, you may send us
            a refund request if you are unhappy with our services. We may offer
            a percentage-based refund based on the status of the project and our
            revision policies. However, refund requests must be submitted within
            the required window to satisfy both parties.
          </li>
        </ul>

        <h2>Before Work Begins</h2>
        <p>
          A full refund may be considered if requested before your work has been
          submitted and before project work has started, subject to the
          deduction of applicable transactional charges as described above.
        </p>

        <h2>After Work Has Started</h2>
        <p>
          Once work has begun, refund eligibility depends on the stage of the
          project:
        </p>
        <ul>
          <li>
            If your manuscript has been submitted but design work has not yet
            started, up to 75% of the purchase price may be retained based on
            work completed.
          </li>
          <li>
            If design work has started but final approval has not been given, up
            to 50% of the purchase price may be retained based on work
            completed.
          </li>
          <li>
            No refund is available after final approval, delivery of completed
            work, or completion of the agreed service.
          </li>
        </ul>

        <h2>Non-Refundable Situations</h2>
        <ul>
          <li>Final deliverables that have been approved or delivered.</li>
          <li>Change of mind after work has started.</li>
          <li>
            Client delays, lack of cooperation, or failure to provide required
            materials or approvals.
          </li>
          <li>
            Third-party costs already incurred, including platform fees,
            advertising spend, printing, distribution, or licensing costs.
          </li>
          <li>
            Requests submitted outside the allowed refund window or after the
            90-calendar-day period following purchase.
          </li>
        </ul>

        <h2>Revisions Before Refund Requests</h2>
        <p>
          Clients are encouraged to use the revision options included in their
          selected service package before requesting a refund. Refund requests
          are reviewed in connection with the revision policies outlined in our{" "}
          <Link href="/terms-of-service">Terms &amp; Conditions</Link>.
        </p>

        <h2>How to Request a Refund</h2>
        <p>To request a refund, please contact us with your order details:</p>
        <ul>
          <li>
            Email{" "}
            <a href="mailto:info@stamfordpublishers.com">
              info@stamfordpublishers.com
            </a>{" "}
            with your name, order or project reference, and reason for the
            request.
          </li>
          <li>
            Refund requests must be submitted within 7 days of order completion
            if you are dissatisfied with the delivered service.
          </li>
          <li>
            Approved refunds are processed after deduction of applicable
            transactional charges and based on the project stage at the time
            of review.
          </li>
        </ul>

        <h2>Third-Party Platforms</h2>
        <p>
          Projects involving third-party publishing platforms, retailers,
          printers, distributors, or advertising networks are subject to those
          platforms&apos; policies and timelines. Stamford Publishers is not
          responsible for refunds arising from third-party rejections, delays,
          policy changes, or technical issues outside our control.
        </p>

        <h2>Policy Updates</h2>
        <p>
          Stamford Publishers reserves the right to update this Refund Policy at
          any time. Changes will be posted on this page. Continued use of our
          services after updates means you accept the revised policy.
        </p>

        <h2>Contact Us</h2>
        <p>
          For questions about this Refund Policy or to submit a refund request,
          please contact us:
        </p>
        <p>
          Email:{" "}
          <a href="mailto:info@stamfordpublishers.com">
            info@stamfordpublishers.com
          </a>
          <br />
          Phone: <a href="tel:+15625732551">(562) 573-2551</a>
          <br />
          Address: 1001 Wilshire Boulevard #1439, Los Angeles, CA 90017
        </p>
      </PolicyContent>
    </main>
  );
}
