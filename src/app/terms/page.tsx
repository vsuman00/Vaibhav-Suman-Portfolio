export default function TermsPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-2">Last updated: {today}</p>

      <h2 className="text-xl font-semibold mb-2">Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing or using this Site, you agree to be bound by these Terms.
      </p>

      <h2 className="text-xl font-semibold mb-2">Intellectual Property</h2>
      <p className="mb-4">
        All content on this Site, including text, images, and code samples, is
        owned by the Site owner and protected by applicable laws. You may not
        reproduce or distribute content without prior written permission.
      </p>

      <h2 className="text-xl font-semibold mb-2">Acceptable Use</h2>
      <p className="mb-4">
        You agree not to misuse the Site, attempt to breach security, or engage
        in unlawful or harmful activities.
      </p>

      <h2 className="text-xl font-semibold mb-2">External Links</h2>
      <p className="mb-4">
        The Site may contain links to third-party websites. We are not
        responsible for their content or privacy practices.
      </p>

      <h2 className="text-xl font-semibold mb-2">Disclaimers</h2>
      <p className="mb-4">
        The Site is provided &quot;as is&quot; without warranties of any kind, including
        accuracy, availability, or fitness for a particular purpose.
      </p>

      <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
      <p className="mb-4">
        To the maximum extent permitted by law, we are not liable for indirect,
        incidental, or consequential damages arising from your use of the Site.
      </p>

      <h2 className="text-xl font-semibold mb-2">Changes to Terms</h2>
      <p className="mb-4">
        We may update these Terms at any time. Your continued use of the Site
        signifies acceptance of the updated Terms.
      </p>

      <h2 className="text-xl font-semibold mb-2">Governing Law</h2>
      <p className="mb-4">
        These Terms are governed by the laws of [Your State/Country].
      </p>

      <h2 className="text-xl font-semibold mb-2">Contact</h2>
      <p>Email: dev.vaibhav01@gmail.com</p>
    </main>
  );
}
