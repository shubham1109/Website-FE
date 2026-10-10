import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { countries } from '../lib/countries';

const labelClass = 'block text-xs font-medium tracking-[0.05em] uppercase mb-2';
const inputClass =
  'w-full bg-transparent border-b border-white/20 py-3 text-[#F5F5F5] outline-none focus:border-[#4ADE80] transition-colors duration-300';

export default function RequestSample() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [requirement, setRequirement] = useState('');

  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Request a Sample | Faraday Earth';
    return () => {
      document.title = 'Faraday Earth | Green Molecules Reimagined';
    };
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!executeRecaptcha) {
        setErrorMsg('reCAPTCHA not ready. Please try again.');
        return;
      }

      const captchaToken = await executeRecaptcha('sample_request');

      setIsSubmitting(true);
      setErrorMsg('');

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: '1c6db9b1-6d99-4f9c-87e5-a5cfdc86dfa1',
            subject: `Sample request from ${company}`,
            form: 'Request a Sample',
            name,
            email,
            company,
            country,
            application_requirement: requirement,
            'g-recaptcha-response': captchaToken,
          }),
        });

        const result = await response.json();
        if (result.success) {
          setSubmitted(true);
          setName('');
          setEmail('');
          setCompany('');
          setCountry('');
          setRequirement('');
        } else {
          setErrorMsg(result.message || 'Something went wrong.');
        }
      } catch {
        setErrorMsg('Failed to send request.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [executeRecaptcha, name, email, company, country, requirement]
  );

  return (
    <main
      className="w-full pt-32 pb-24 px-6 min-h-screen"
      style={{ background: '#0A0A0A', color: '#F5F5F5' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Left Column */}
          <div className="flex-1">
            <h1
              className="font-semibold tracking-tight"
              style={{
                fontSize: 'clamp(36px, 3.5vw, 48px)',
                lineHeight: 1.2,
                color: '#F5F5F5',
              }}
            >
              Request a <span style={{ color: '#4ADE80' }}>Sample</span>
            </h1>
            <p
              className="mt-4 max-w-[480px]"
              style={{ color: '#A3A3A3', fontSize: '16px', lineHeight: 1.6 }}
            >
              Tell us about your application and we will get in touch to arrange a sample of
              green molecules produced with our non-thermal plasma reactors.
            </p>

            <div className="mt-12 space-y-6">
              <div>
                <span className={labelClass} style={{ color: '#A3A3A3' }}>
                  Email us
                </span>
                <a
                  href="mailto:connect@faradayearth.com"
                  className="text-[#4ADE80] hover:underline transition-all duration-300"
                >
                  connect@faradayearth.com
                </a>
              </div>
              <div>
                <Link
                  to="/"
                  className="text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors duration-300"
                >
                  &larr; Back to home
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex-1">
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center text-center h-full min-h-[300px] rounded-lg px-6"
                style={{ background: '#111111', border: '1px solid rgba(74,222,128,0.2)' }}
              >
                <p className="text-[#4ADE80] text-lg font-medium">Request received!</p>
                <p className="mt-2 text-sm" style={{ color: '#A3A3A3' }}>
                  Our team will reach out to you shortly.
                </p>
                <Link
                  to="/"
                  className="mt-6 border border-[#4ADE80] text-[#4ADE80] text-sm font-medium px-6 py-2 rounded-full hover:bg-[#4ADE80] hover:text-[#0A0A0A] transition-all duration-300"
                >
                  Back to home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="rs-name" className={labelClass} style={{ color: '#A3A3A3' }}>
                      Name *
                    </label>
                    <input
                      id="rs-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="rs-email" className={labelClass} style={{ color: '#A3A3A3' }}>
                      Email *
                    </label>
                    <input
                      id="rs-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                      placeholder="your@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="rs-company" className={labelClass} style={{ color: '#A3A3A3' }}>
                      Company *
                    </label>
                    <input
                      id="rs-company"
                      type="text"
                      required
                      autoComplete="organization"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className={inputClass}
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="rs-country" className={labelClass} style={{ color: '#A3A3A3' }}>
                      Country *
                    </label>
                    <select
                      id="rs-country"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className={`${inputClass} appearance-none cursor-pointer`}
                      style={{ background: '#0A0A0A' }}
                    >
                      <option value="" style={{ background: '#0A0A0A' }}>
                        Select country
                      </option>
                      {countries.map((c) => (
                        <option key={c} value={c} style={{ background: '#0A0A0A' }}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="rs-requirement" className={labelClass} style={{ color: '#A3A3A3' }}>
                    Application requirement *
                  </label>
                  <textarea
                    id="rs-requirement"
                    rows={5}
                    required
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className={`${inputClass} resize-none`}
                    placeholder="Describe your application, required quantity, purity, and timeline..."
                  />
                </div>

                {errorMsg && <div className="text-red-500 text-sm mt-2">{errorMsg}</div>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#4ADE80] text-[#0A0A0A] font-medium px-8 py-3 rounded-full hover:scale-[1.02] transition-transform duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Request Sample'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
