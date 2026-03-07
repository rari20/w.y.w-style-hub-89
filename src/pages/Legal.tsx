import Layout from '@/components/Layout';

export function TermsPage() {
  return (
    <Layout>
      <div className="wyw-container py-8 max-w-3xl prose prose-sm">
        <h1 className="text-5xl font-display mb-8">TERMS & CONDITIONS</h1>
        <p className="text-muted-foreground">These terms and conditions govern your use of the W.Y.W website and services. By using our site, you agree to these terms in full. If you disagree, please do not use our site.</p>
        <h2 className="font-display text-2xl mt-8 mb-3">1. ORDERING</h2>
        <p className="text-muted-foreground text-sm">All orders are subject to availability. We reserve the right to refuse or cancel any order for any reason. Prices are displayed inclusive of VAT where applicable.</p>
        <h2 className="font-display text-2xl mt-8 mb-3">2. DELIVERY</h2>
        <p className="text-muted-foreground text-sm">We offer Standard, Next Day, Click & Collect, and subscription delivery options. Delivery times are estimates and not guaranteed. See our delivery page for full details.</p>
        <h2 className="font-display text-2xl mt-8 mb-3">3. RETURNS</h2>
        <p className="text-muted-foreground text-sm">Items may be returned within 30 days of delivery. Please see our Returns Policy for full details.</p>
        <h2 className="font-display text-2xl mt-8 mb-3">4. LOYALTY PROGRAMME</h2>
        <p className="text-muted-foreground text-sm">W.Y.W Rewards points are earned on qualifying purchases and may be redeemed at checkout. Points have no cash value and are non-transferable. We reserve the right to modify the programme at any time.</p>
      </div>
    </Layout>
  );
}

export function PrivacyPage() {
  return (
    <Layout>
      <div className="wyw-container py-8 max-w-3xl">
        <h1 className="text-5xl font-display mb-8">PRIVACY POLICY</h1>
        <p className="text-muted-foreground mb-4">W.Y.W is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.</p>
        <h2 className="font-display text-2xl mt-8 mb-3">WHAT WE COLLECT</h2>
        <p className="text-muted-foreground text-sm">Name, email, address, phone number, order history, browsing behaviour, and loyalty programme data.</p>
        <h2 className="font-display text-2xl mt-8 mb-3">HOW WE USE IT</h2>
        <p className="text-muted-foreground text-sm">To process orders, manage your account, personalise your experience, send marketing communications (with consent), and improve our services.</p>
      </div>
    </Layout>
  );
}

export function CookiePage() {
  return (
    <Layout>
      <div className="wyw-container py-8 max-w-3xl">
        <h1 className="text-5xl font-display mb-8">COOKIE POLICY</h1>
        <p className="text-muted-foreground mb-4">We use cookies to enhance your browsing experience, analyse site traffic, and personalise content. By continuing to use our site, you consent to our use of cookies.</p>
      </div>
    </Layout>
  );
}

export function AccessibilityPage() {
  return (
    <Layout>
      <div className="wyw-container py-8 max-w-3xl">
        <h1 className="text-5xl font-display mb-8">ACCESSIBILITY STATEMENT</h1>
        <p className="text-muted-foreground mb-4">W.Y.W is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards.</p>
        <p className="text-muted-foreground text-sm">If you experience any difficulty accessing any part of our website, please contact us at accessibility@wyw.com.</p>
      </div>
    </Layout>
  );
}
