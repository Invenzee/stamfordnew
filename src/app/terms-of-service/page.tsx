import type { Metadata } from "next";
import Link from "next/link";
import PolicyContent from "@/components/PolicyContent";
import PolicyHero from "@/components/PolicyHero";

export const metadata: Metadata = {
  title: "Terms & Conditions | Stamford Publishers",
  description:
    "Read the terms and conditions governing your use of Stamford Publishers website and publishing services.",
};

export default function TermsOfServicePage() {
  return (
    <main className="flex flex-1 flex-col">
      <PolicyHero title="Terms & Conditions" />
      <PolicyContent>
        <p>
          Welcome to Stamford Publishers. By accessing our website or using our
          publishing, writing, editing, design, audiobook, marketing, or related
          services, you agree to the following Terms &amp; Conditions. Please
          read them carefully before placing an order or submitting any project
          information.
        </p>

        <h2>Services</h2>
        <p>
          Stamford Publishers provides professional publishing services for
          authors, including manuscript editing, formatting, cover design,
          audiobook production, publishing setup, distribution support,
          ghostwriting, and book marketing. All services are offered as paid,
          project-based solutions and are delivered according to the selected
          package, project scope, and agreed requirements.
        </p>

        <h2>Client Responsibility</h2>
        <p>
          The client is responsible for providing accurate project details,
          manuscript files, reference materials, approvals, and any required
          information needed to complete the project. Delays in providing
          required materials may affect the project timeline.
        </p>

        <h2>Project Scope</h2>
        <p>
          Each project begins based on the services selected and the
          requirements shared by the client. Any additional work outside the
          original project scope may require extra charges and a revised
          timeline. Stamford Publishers will communicate any major scope changes
          before proceeding.
        </p>

        <h2>Payment Terms</h2>
        <p>
          Full or agreed payment must be made before work begins. The client may
          also be responsible for applicable taxes, transaction fees, or
          processing charges. Work will only proceed once the required payment
          has been received and confirmed.
        </p>

        <h2>Revisions</h2>
        <p>
          Stamford Publishers offers revisions based on the selected service
          package and agreed project scope. Revision requests must be submitted
          within the allowed revision period. Revisions must relate to the
          original project requirements and may not include a completely new
          direction, new concept, or additional service not originally agreed
          upon.
        </p>
        <p>Our standard revision period is 14 days. This time limit may be extended only in exceptional circumstances at the discretion of Stamford Publishers.</p>
        <p>The following categories apply to revision turnaround time:</p>
        <ul>
          <li>
            Revision turnaround time for projects requiring 24-hour urgency shall
            be 24 hours.
          </li>
          <li>
            Projects requiring 24 to 48 hours of speed must have a 48-hour
            turnaround time for revisions.
          </li>
          <li>
            Revision turnaround time shall be 72 hours for projects requiring
            more than 48 hours.
          </li>
        </ul>

        <h2>Turnaround Time</h2>
        <p>
          Project timelines may vary depending on the type of service, project
          size, client response time, revision requirements, and overall
          workload. Stamford Publishers makes every effort to complete projects
          within the estimated timeline, but delays may occur due to changes in
          scope, late client feedback, or technical requirements.
        </p>

        <h2>Refund Policy</h2>
        <p>
          Refund requests are reviewed based on the status of the project and the
          services already completed. Once work has started, partial or full
          refunds may not be available depending on the progress made. No
          refund will be issued after final approval, delivery of completed
          work, or completion of the agreed service. Transactional charges may
          be deducted from any approved refund.
        </p>
        <p>
          Full details are set out in our{" "}
          <Link href="/refund-policy">Refund Policy</Link>.
        </p>

        <h2>Ownership &amp; Copyright</h2>
        <p>
          Once full payment has been completed, the client retains ownership of
          the final approved content created for their project. Stamford
          Publishers does not claim ownership over the final approved
          manuscript, design, or completed publishing materials delivered to
          the client, unless otherwise agreed in writing.
        </p>

        <h2>Copyrights</h2>
        <p>
          Our company philosophy is to grant you ownership of the content we
          deliver under the terms below. The final product we create carries no
          ownership claim from Stamford Publishers, and you may use it in the way
          you see fit once all agreed payments have been completed.
        </p>

        <h2>Content Accuracy</h2>
        <p>
          The client is responsible for reviewing and approving all final
          content, including spelling, grammar, facts, names, pricing, legal
          information, and publishing details. Stamford Publishers is not
          responsible for errors or omissions after the client has approved the
          final work.
        </p>

        <h2>Publishing &amp; Distribution</h2>
        <p>
          Stamford Publishers may assist with publishing setup and distribution
          preparation across selected platforms. However, approval, acceptance,
          processing time, availability, and final publishing decisions may
          depend on third-party platforms. Stamford Publishers does not control
          third-party publishing platforms, retailers, or distribution networks.
        </p>

        <h2>Marketing Services</h2>
        <p>
          Book marketing services are provided to support visibility, promotion,
          and audience outreach. Stamford Publishers does not guarantee book
          sales, rankings, reviews, media coverage, bestseller status, or
          specific financial results from marketing campaigns.
        </p>

        <h2>Third-Party Platforms</h2>
        <p>
          Some services may involve third-party tools, platforms, printers,
          distributors, advertising networks, or publishing marketplaces.
          Stamford Publishers is not responsible for policy changes, delays,
          account issues, rejections, fees, or technical problems caused by
          third-party platforms.
        </p>

        <h2>Communication Consent</h2>
        <p>
          By submitting your contact details, you agree that Stamford
          Publishers may contact you by phone, email, or SMS regarding your
          inquiry, project, service updates, revisions, promotions, or support.
          Message and data rates may apply for SMS communication. You may opt out
          at any time by replying &ldquo;STOP&rdquo; or using the unsubscribe
          option where available.
        </p>

        <h2>Conditions for a Project</h2>
        <p>
          Before starting the project, Stamford Publishers conducts one-on-one
          communication with each client to review project requirements. Based
          on the terms and conditions agreed upon at the beginning of the
          project, we make sure to communicate any changes, differences, or
          service-related updates clearly during the process.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          Stamford Publishers will not be held liable for indirect losses,
          business losses, lost profits, publishing delays, third-party platform
          issues, data loss, or damages resulting from the use of our website or
          services. Our liability is limited to the amount paid for the specific
          service in question.
        </p>

        <h2>No Guarantee</h2>
        <p>
          Stamford Publishers provides professional services based on the selected
          package and project requirements. We do not guarantee publishing
          acceptance, sales performance, reader response, bestseller status,
          media placement, reviews, or specific commercial outcomes.
        </p>

        <h2>Confidentiality</h2>
        <p>
          Stamford Publishers respects client confidentiality and handles project
          materials with care. Client manuscripts, personal information, and
          project details will not be intentionally shared with unauthorized
          third parties, except when required for service delivery or by law.
        </p>

        <h2>Terms of Use</h2>
        <p>
          The services offered by Stamford Publishers are included in the
          information provided on our website. This information is not
          restricted; however, we do not provide any additional
          recommendations, certifications, warranties, or guarantees unless
          stated in writing.
        </p>
        <p>
          Our business disclaims all liability for any losses or damages
          resulting from errors, omissions, or careless mistakes made on this
          website.
        </p>
        <p>
          Our business will not be held responsible for any performance issues,
          operational delays, omissions, disruptions, communication gaps, theft,
          data loss, or unauthorized access to information on the website.
        </p>
        <p>
          By accepting our terms and conditions, you agree to indemnify and
          hold Stamford Publishers and its subsidiaries harmless from and
          against any third-party claims, liabilities, losses, damages, or
          expenses resulting from or connected to your access to or use of the
          website and services supplied, your violation of these Terms of Use,
          or your violation of any third-party right, including without
          limitation any intellectual property right, publicity,
          confidentiality, property, or privacy right.
        </p>
        <p>
          No partnership, joint venture, or employment relationship between
          Stamford Publishers and its clients is created by any agreement made
          through the website.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          Stamford Publishers reserves the right to update or modify these Terms
          &amp; Conditions at any time. Any changes will be posted on our
          website. Continued use of our website or services after updates means
          you accept the revised terms.
        </p>

        <h2>Contact Us</h2>
        <p>
          For questions about these Terms &amp; Conditions, please contact
          Stamford Publishers at{" "}
          <a href="mailto:info@stamfordpublishers.com">
            info@stamfordpublishers.com
          </a>{" "}
          or call us at <a href="tel:+15625732551">+1 562 573 2551</a>.
        </p>
        <p>
          Address: 1001 Wilshire Boulevard #1439, Los Angeles, CA 90017
        </p>
        <p>
          Your use of our services is also governed by our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </PolicyContent>
    </main>
  );
}
