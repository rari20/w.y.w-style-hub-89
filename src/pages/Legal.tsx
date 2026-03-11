import Layout from '@/components/Layout';

function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <div className="wyw-container py-12 pt-24 pb-24">
        <div className="max-w-[720px] mx-auto">
          {children}
        </div>
      </div>
    </Layout>
  );
}

export function TermsPage() {
  return (
    <LegalLayout>
      <h1 className="font-display text-foreground mb-2 leading-[1.1]" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Terms & Conditions</h1>
      <p className="text-[0.78rem] text-muted-foreground tracking-[0.08em] mb-8 pb-6 border-b border-border">Last updated: 1 March 2026</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">1. About W.Y.W</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">Watt You Want? (W.Y.W) is a contemporary fashion label operating physical stores and an online platform. These terms govern your use of our website and services.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">2. Orders & Acceptance</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">Placing an order constitutes an offer to purchase. W.Y.W reserves the right to decline any order. You will receive an order confirmation email; your order is only accepted once your payment is processed and a dispatch confirmation is sent.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">3. Pricing</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">All prices are displayed in GBP and include VAT where applicable. W.Y.W reserves the right to change prices at any time. The price charged will be the price displayed at the time of your order.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">4. Delivery</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">Delivery timescales are estimates and not guaranteed. W.Y.W is not liable for delays caused by circumstances outside our control. Risk in goods passes to you on delivery.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">5. Returns & Refunds</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">You have the right to return most items within 28 days of receipt. Items must be unworn, unwashed, and in original condition with tags attached. See our Returns Policy for full details.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">6. Intellectual Property</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">All content on this website — including images, text, logos, and design assets — is the property of W.Y.W and is protected by copyright law. You may not reproduce or distribute any content without written permission.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">7. Limitation of Liability</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">W.Y.W's liability to you in connection with any order will not exceed the total price charged for the relevant items. We are not liable for indirect or consequential losses.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">8. Governing Law</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">These terms are governed by the laws of Scotland. Any disputes will be subject to the exclusive jurisdiction of the Scottish courts.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">9. Contact</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">For any queries regarding these terms, contact us at legal@wyw.com or write to W.Y.W, 14 George Street, Edinburgh, EH2 2PF.</p>
    </LegalLayout>
  );
}

export function PrivacyPage() {
  return (
    <LegalLayout>
      <h1 className="font-display text-foreground mb-2 leading-[1.1]" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Privacy Policy</h1>
      <p className="text-[0.78rem] text-muted-foreground tracking-[0.08em] mb-8 pb-6 border-b border-border">Last updated: 1 March 2026</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">1. Who We Are</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">W.Y.W (Watt You Want?) is the data controller for personal data collected through this website and in our physical stores. We are registered with the Information Commissioner's Office (ICO).</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">2. Data We Collect</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-3">We collect the following categories of personal data:</p>
      <div className="pl-6 mb-5 border-l-2 border-border">
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-[0.4rem]">Identity data: name, email address, phone number</p>
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-[0.4rem]">Transactional data: order history, payment records (excluding full card details)</p>
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-[0.4rem]">Behavioural data: browsing activity, wishlist, session history</p>
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-[0.4rem]">Loyalty data: points balance, tier status, redemption history</p>
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-[0.4rem]">Communication data: email preferences, marketing consent</p>
      </div>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">3. How We Use Your Data</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">We use your data to process orders, manage your account, deliver marketing communications (with consent), improve our services, and comply with legal obligations.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">4. Legal Basis for Processing</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">We process your data on the following legal bases: contract performance (order processing), legitimate interests (fraud prevention, service improvement), consent (marketing emails), and legal obligation (tax records).</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">5. Data Retention</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">We retain transactional data for 7 years for tax and legal purposes. Account data is retained for as long as your account is active plus 2 years. Marketing preferences are retained until you withdraw consent.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">6. Your Rights</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">Under UK GDPR you have the right to access, rectify, erase, restrict, and port your personal data. You also have the right to object to processing and to withdraw consent. Contact privacy@wyw.com to exercise your rights.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">7. Cookies</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">We use cookies to maintain your session, remember preferences, and analyse site performance. See our Cookie Policy for full details.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">8. Third Parties</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">We share data only with service providers necessary to deliver our service (payment processors, delivery couriers, email platforms). We do not sell personal data to third parties.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">9. Contact</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">For privacy queries: privacy@wyw.com. To make a complaint to the regulator: ico.org.uk.</p>
    </LegalLayout>
  );
}

export function CookiePage() {
  return (
    <LegalLayout>
      <h1 className="font-display text-foreground mb-2 leading-[1.1]" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Cookie Policy</h1>
      <p className="text-[0.78rem] text-muted-foreground tracking-[0.08em] mb-8 pb-6 border-b border-border">Last updated: 1 March 2026</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">1. What Are Cookies</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">Cookies are small text files stored on your device when you visit a website. They allow the site to remember your preferences and understand how you use the service.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">2. Cookies We Use</h2>

      <h3 className="font-body text-[0.9rem] font-semibold text-foreground mt-6 mb-2">Essential Cookies</h3>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">These cookies are required for the website to function. They cannot be disabled. They include session cookies that keep you logged in and basket cookies that remember your items.</p>

      <h3 className="font-body text-[0.9rem] font-semibold text-foreground mt-6 mb-2">Performance Cookies</h3>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">These cookies collect anonymised data about how visitors use our site — which pages are most visited, where errors occur. We use this to improve site performance. Consent required.</p>

      <h3 className="font-body text-[0.9rem] font-semibold text-foreground mt-6 mb-2">Functional Cookies</h3>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">These cookies remember your preferences such as dark/light mode, saved addresses, and language. Consent required.</p>

      <h3 className="font-body text-[0.9rem] font-semibold text-foreground mt-6 mb-2">Marketing Cookies</h3>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">These cookies track your browsing activity to deliver relevant advertising and personalised product recommendations. Consent required and can be withdrawn at any time.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">3. Managing Cookies</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">You can manage your cookie preferences at any time via the cookie banner or by adjusting your browser settings. Note that disabling essential cookies will affect site functionality.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">4. Third-Party Cookies</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">Our site may include cookies from third-party services such as analytics providers and social media platforms. These are governed by their own privacy policies.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">5. Contact</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">For cookie-related queries: privacy@wyw.com</p>
    </LegalLayout>
  );
}

export function AccessibilityPage() {
  return (
    <LegalLayout>
      <h1 className="font-display text-foreground mb-2 leading-[1.1]" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Accessibility Statement</h1>
      <p className="text-[0.78rem] text-muted-foreground tracking-[0.08em] mb-8 pb-6 border-b border-border">Last updated: 1 March 2026</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">1. Our Commitment</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">W.Y.W is committed to making our website accessible to all users, including those with disabilities. We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standard.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">2. What We Do</h2>
      <div className="pl-6 mb-5 border-l-2 border-border">
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-[0.4rem]">All images include descriptive alt text</p>
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-[0.4rem]">The site is fully navigable by keyboard</p>
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-[0.4rem]">Colour contrast meets WCAG AA minimum ratios</p>
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-[0.4rem]">Form fields are correctly labelled for screen readers</p>
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-[0.4rem]">Animations respect the prefers-reduced-motion setting</p>
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-[0.4rem]">Font sizes scale with browser text size settings</p>
        <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-[0.4rem]">Interactive elements have visible focus indicators</p>
      </div>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">3. Known Limitations</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">We are aware of the following areas currently being improved: some older PDF documents may not be fully accessible to screen readers, and live chat functionality has limited screen reader support.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">4. Feedback & Contact</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">If you experience any accessibility barriers on our site, please contact us at accessibility@wyw.com. We aim to respond within 5 working days and take all feedback seriously.</p>

      <h2 className="font-body text-[1rem] font-semibold uppercase tracking-[0.08em] text-foreground mt-8 mb-3">5. Enforcement</h2>
      <p className="text-[0.9rem] leading-[1.85] text-muted-foreground mb-5">If you are not satisfied with our response, you can contact the Equality Advisory and Support Service (EASS) at equalityadvisoryservice.com.</p>
    </LegalLayout>
  );
}
