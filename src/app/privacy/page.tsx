export default function PrivacyPage() {
  const today = new Date().toISOString().slice(0, 10)
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-2">Last updated: {today}</p>

      <p className="mb-6">
        This personal portfolio website ("Site") respects your privacy. This
        policy explains what information we collect, how we use it, and your
        rights.
      </p>

      <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
      <p className="mb-4">
        We collect your name, email address, and the content of your message
        when you submit the contact form. We also process basic usage data (such
        as page views, referrers, and device information) and server logs to
        improve the Site and keep it secure.
      </p>

      <h2 className="text-xl font-semibold mb-2">
        How We Use Your Information
      </h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Respond to inquiries and manage communications</li>
        <li>Improve content, performance, and security of the Site</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Legal Basis</h2>
      <p className="mb-4">
        Consent (submitted forms) and legitimate interests (analytics and
        security).
      </p>

      <h2 className="text-xl font-semibold mb-2">Sharing</h2>
      <p className="mb-4">
        We do not sell your personal information. We share it only with service
        providers that help run this Site (hosting, analytics, email delivery)
        under appropriate agreements.
      </p>

      <h2 className="text-xl font-semibold mb-2">Retention</h2>
      <p className="mb-4">
        We retain contact messages for up to 18 months unless you ask us to
        delete them sooner.
      </p>

      <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
      <p className="mb-4">
        You can request access, correction, or deletion of your data by emailing
        you@example.com.
      </p>

      <h2 className="text-xl font-semibold mb-2">International Transfers</h2>
      <p className="mb-4">
        Your data may be processed in other countries depending on our hosting
        and service providers.
      </p>

      <h2 className="text-xl font-semibold mb-2">Security</h2>
      <p className="mb-4">
        We use reasonable administrative, technical, and physical safeguards.
        However, no method of transmission or storage is completely secure.
      </p>

      <h2 className="text-xl font-semibold mb-2">Changes</h2>
      <p className="mb-4">
        We may update this policy. We will update the date above when changes
        are made.
      </p>

      <h2 className="text-xl font-semibold mb-2">Contact</h2>
      <p>Email: dev.vaibhav01@gmail.com</p>
    </main>
  );
}