import { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full pt-32 pb-24 px-6 min-h-screen" style={{ background: '#0A0A0A', color: '#F5F5F5' }}>
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-[#4ADE80]">Privacy Policy</h1>
        
        <div className="space-y-8 text-[#A3A3A3] leading-relaxed">
          <p>
            <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
          </p>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#F5F5F5]">1. Introduction</h2>
            <p>
              Faraday Earth ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#F5F5F5]">2. Information We Collect</h2>
            <p className="mb-4">
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and country, that you voluntarily give to us when you submit a contact form.
              </li>
              <li>
                <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, and the pages you have viewed.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#F5F5F5]">3. Use of Your Information</h2>
            <p className="mb-4">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to your customer service requests and support needs.</li>
              <li>Improve our website and services based on user feedback.</li>
              <li>Send you administrative information, such as updates to our terms, conditions, and policies.</li>
              <li>Protect against fraud, unauthorized transactions, and manage security through CAPTCHA services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#F5F5F5]">4. Cookies and Web Beacons</h2>
            <p>
              We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology without your explicit consent via our cookie banner. If you choose to decline, we will not save tracking cookies on your device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#F5F5F5]">5. Contact Us</h2>
            <p className="mb-2">
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className="text-[#4ADE80]">
              <a href="mailto:connect@faradayearth.com" className="hover:underline">connect@faradayearth.com</a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
