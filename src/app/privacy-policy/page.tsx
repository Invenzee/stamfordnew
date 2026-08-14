import type { Metadata } from "next";
import Link from "next/link";
import PolicyContent from "@/components/PolicyContent";
import PolicyHero from "@/components/PolicyHero";

export const metadata: Metadata = {
  title: "Privacy Policy | Stamford Publishers",
  description:
    "Learn how Stamford Publishers collects, uses, protects, and discloses your personal information when you use our website and services.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PolicyHero title="Privacy Policy" />
      <PolicyContent>
        <p>
          At Stamford Publishers, we value your privacy and are committed to
          safeguarding the personal information you share with us. This Privacy
          Policy explains how we collect, use, protect, and disclose your
          personal data when you interact with our website and services. By
          using our website and services, you consent to the practices described
          in this Privacy Policy.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We collect both personal and non-personal information to provide our
          publishing services and improve your experience:
        </p>
        <ul>
          <li>
            <strong>Personal Information:</strong> This may include your name,
            email address, phone number, project details, manuscript files, and
            any materials you submit through our forms or during communication
            with our team.
          </li>
          <li>
            <strong>Non-Personal Information:</strong> This includes your IP
            address, browser type, device information, and website usage data,
            collected through cookies and similar technologies.
          </li>
          <li>
            <strong>Payment Information:</strong> Payment details are processed
            through secure third-party payment providers and are not stored by
            Stamford Publishers beyond what is necessary to complete
            transactions.
          </li>
        </ul>

        <h2>How We Collect Information</h2>
        <ul>
          <li>
            <strong>Voluntary Submission:</strong> When you submit contact forms,
            request a quote, place an order, or communicate with us by phone,
            email, or SMS.
          </li>
          <li>
            <strong>Automated Collection:</strong> Non-personal information is
            automatically gathered through cookies and similar technologies as
            you navigate our website.
          </li>
          <li>
            <strong>Third-Party Services:</strong> If you make payments or use
            integrated tools, third-party providers may collect information
            subject to their own privacy policies.
          </li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>To provide publishing, writing, editing, design, marketing, and related services.</li>
          <li>To communicate about your inquiry, project, revisions, updates, and support.</li>
          <li>To improve our website, services, and customer experience.</li>
          <li>
            With your consent, to send promotional offers, newsletters, and
            service-related communications.
          </li>
          <li>To comply with legal obligations and protect our rights.</li>
        </ul>

        <h2>Data Sharing and Disclosure</h2>
        <p>
          We do not sell or rent your personal information. We may share your
          data only in the following circumstances:
        </p>
        <ul>
          <li>
            <strong>Service Providers:</strong> With trusted vendors who assist
            with payment processing, hosting, communication delivery, or project
            fulfillment, solely to perform services on our behalf.
          </li>
          <li>
            <strong>Legal Compliance:</strong> When required by law, court
            order, or lawful government request.
          </li>
          <li>
            <strong>Business Transactions:</strong> In connection with a merger,
            acquisition, or sale of assets, where permitted by law.
          </li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement reasonable security measures to protect your personal
          information. However, no method of transmission or storage is
          completely secure, and we cannot guarantee absolute protection.
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain personal information only for as long as necessary to
          fulfill the purposes for which it was collected, including project
          delivery, support, and legal compliance. You may request deletion of
          your data by contacting us, subject to applicable legal and business
          requirements.
        </p>

        <h2>Your Rights</h2>
        <ul>
          <li>Request access to or correction of your personal information.</li>
          <li>Request deletion of your personal information, where applicable.</li>
          <li>Opt out of marketing communications at any time.</li>
        </ul>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our website and services are not intended for children under the age of
          13. We do not knowingly collect personal information from children. If
          we learn that a child has provided personal information, we will take
          steps to delete it.
        </p>

        <h2>Confidentiality</h2>
        <p>
          Stamford Publishers respects client confidentiality. Your manuscripts,
          project materials, and personal information are handled with care and
          are not intentionally shared with unauthorized third parties, except
          when required for service delivery or by law.
        </p>

        <h2>Email &amp; Mobile Phone Policy</h2>

        <h3>Consent and Usage</h3>
        <p>
          By providing your email address and/or mobile phone number, you consent
          to receive communication from Stamford Publishers. This may include
          transactional messages, periodic updates about your service or project,
          newsletters, service delivery messages, design attachments, project
          updates, and revision updates.
        </p>

        <h3>Carrier Charges Disclosure</h3>
        <p>
          Standard messaging and data rates may apply. Please consult your mobile
          service carrier for details.
        </p>

        <h3>Stop &amp; Unsubscribe</h3>
        <p>If you wish to stop receiving emails or mobile communications, you can unsubscribe at any time.</p>
        <ul>
          <li>
            For emails, click the &ldquo;unsubscribe&rdquo; link located at the
            bottom of any email you receive from us.
          </li>
          <li>
            For mobile communications, reply &ldquo;STOP,&rdquo;
            &ldquo;Unsub,&rdquo; or &ldquo;Unsubscribe&rdquo; to any SMS message
            you receive from us. SMS messages will be stopped right away.
          </li>
        </ul>

        <h3>Frequency of Communication</h3>
        <p>
          We strive to limit the frequency of our communications to a reasonable
          level. However, there may be exceptions during special project updates
          or urgent notifications.
        </p>

        <h3>Security of Information</h3>
        <p>
          Your email address and mobile phone number will be kept confidential
          and will not be shared with third parties without your explicit
          consent, except as required by law or as needed to deliver our
          services.
        </p>

        <h2>SMS and Email Terms &amp; Conditions</h2>

        <h3>Overview</h3>
        <p>
          By subscribing to our SMS and email communication services, you agree
          to receive text messages and emails from Stamford Publishers. These
          communications may include updates, promotional content,
          notifications, and other information related to our services. Your
          participation in these programs is subject to the following terms, in
          compliance with 10DLC TCR regulations for the US and Canada.
        </p>

        <h3>Opt-In Process</h3>
        <p>
          <strong>SMS Subscription:</strong> When you provide your mobile number
          on our website, you may receive a confirmation text message asking for
          your consent to subscribe to our SMS service. By replying to the
          confirmation message with the designated keyword, such as
          &ldquo;YES,&rdquo; you agree to opt in to receive SMS messages from
          Stamford Publishers.
        </p>
        <p>
          <strong>Email Subscription:</strong> By providing your email address and
          selecting the option to receive communications from us, you consent to
          receiving emails related to our services, promotions, and updates.
        </p>

        <h3>Message Frequency</h3>
        <p>
          <strong>SMS:</strong> The number of SMS messages you receive may vary
          based on your communication requirements with our team.
        </p>
        <p>
          <strong>Email:</strong> Emails will be sent periodically and may vary
          in frequency depending on the type of communication and your
          preferences.
        </p>

        <h3>Opt-Out Process</h3>
        <p>
          <strong>SMS Opt-Out:</strong> You can opt out of our SMS communications
          at any time by replying to any of our messages with the word
          &ldquo;STOP.&rdquo; Upon receipt of your opt-out request, we will send
          a confirmation message, and you will no longer receive SMS messages
          from us.
        </p>
        <p>
          <strong>Email Opt-Out:</strong> To unsubscribe from our email
          communications, click the &ldquo;unsubscribe&rdquo; link provided at
          the bottom of any email we send. You can also contact us directly at{" "}
          <a href="mailto:info@stamfordpublishers.com">
            info@stamfordpublishers.com
          </a>{" "}
          to request removal from our email list.
        </p>

        <h3>Cost</h3>
        <p>
          <strong>SMS:</strong> Message and data rates may apply based on your
          mobile carrier plan. Please check with your carrier for details.
        </p>
        <p>
          <strong>Email:</strong> There is no charge for email communications.
        </p>

        <h3>Support</h3>
        <p>
          If you have any questions or need assistance with our SMS or email
          services, please contact our support team at{" "}
          <a href="mailto:info@stamfordpublishers.com">
            info@stamfordpublishers.com
          </a>{" "}
          or call us at <a href="tel:+15625732551">(562) 573-2551</a>.
        </p>

        <h3>Compliance</h3>
        <p>
          We adhere to the rules and regulations set forth by the 10DLC TCR, The
          Campaign Registry, and comply with all relevant laws and guidelines for
          SMS and email marketing in the US and Canada. Your participation in our
          messaging programs is subject to these regulations.
        </p>
        <p>
          No mobile information will be shared with third parties or affiliates
          for marketing or promotional purposes. Text messaging originator
          opt-in data and consent will not be shared with any third parties.
        </p>

        <h2>Changes to Policy</h2>
        <p>
          Stamford Publishers reserves the right to modify this Privacy Policy at
          any time. Any changes will be posted on our website, and it is your
          responsibility to review these changes. Continued use of our website
          or services after updates means you accept the revised policy.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy,
          please contact us at:
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
        <p>
          Please also review our{" "}
          <Link href="/terms-of-service">Terms &amp; Conditions</Link> and{" "}
          <Link href="/refund-policy">Refund Policy</Link>.
        </p>
      </PolicyContent>
    </main>
  );
}
