import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReCAPTCHA from 'react-google-recaptcha';

gsap.registerPlugin(ScrollTrigger);

const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
  'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
  'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
  'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde',
  'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros',
  'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark',
  'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador',
  'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji',
  'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece',
  'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras',
  'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
  'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati',
  'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos',
  'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania',
  'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
  'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova',
  'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia',
  'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria',
  'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama',
  'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia',
  'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
  'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
  'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan',
  'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga',
  'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda',
  'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay',
  'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen',
  'Zambia', 'Zimbabwe',
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [purpose, setPurpose] = useState('');

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.contact-left'),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        section.querySelector('.contact-right'),
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setErrorMsg('Please complete the reCAPTCHA.');
      return;
    }

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
          name,
          email,
          country,
          purpose,
          'g-recaptcha-response': captchaToken,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setCountry('');
        setPurpose('');
        setCaptchaToken(null);
        recaptchaRef.current?.reset();

        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setErrorMsg(result.message || 'Something went wrong.');
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
      }
    } catch (error) {
      setErrorMsg('Failed to send message.');
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full py-[120px] md:py-[120px]"
      style={{ background: '#171717' }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Left Column */}
          <div className="contact-left flex-1 opacity-0">
            <h2
              className="font-semibold tracking-tight"
              style={{
                fontSize: 'clamp(36px, 3.5vw, 48px)',
                lineHeight: 1.2,
                color: '#F5F5F5',
              }}
            >
              Let&rsquo;s Build a Carbon-Free Future
            </h2>
            <p
              className="mt-4"
              style={{ color: '#A3A3A3', fontSize: '16px', lineHeight: 1.6 }}
            >
              Whether you&rsquo;re a fertilizer producer, shipping operator, investor, or energy
              utility &mdash; we want to hear from you.
            </p>

            <div className="mt-12 space-y-6">
              <div>
                <span className="block text-xs font-medium tracking-[0.05em] uppercase" style={{ color: '#A3A3A3' }}>
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
                <span className="block text-xs font-medium tracking-[0.05em] uppercase" style={{ color: '#A3A3A3' }}>
                  Address
                </span>
                <span style={{ color: '#A3A3A3' }}>
                  251 Little Falls Drive, Wilmington, Delaware 19808
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="contact-right flex-1 opacity-0">
            {submitted ? (
              <div
                className="flex items-center justify-center h-full min-h-[300px] rounded-lg"
                style={{ background: '#111111', border: '1px solid rgba(74,222,128,0.2)' }}
              >
                <p className="text-[#4ADE80] text-lg font-medium">Message sent successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium tracking-[0.05em] uppercase mb-2" style={{ color: '#A3A3A3' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-[#F5F5F5] outline-none focus:border-[#4ADE80] transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium tracking-[0.05em] uppercase mb-2" style={{ color: '#A3A3A3' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-[#F5F5F5] outline-none focus:border-[#4ADE80] transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium tracking-[0.05em] uppercase mb-2" style={{ color: '#A3A3A3' }}>
                    Country
                  </label>
                  <select
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-[#F5F5F5] outline-none focus:border-[#4ADE80] transition-colors duration-300 appearance-none cursor-pointer"
                    style={{ background: '#171717' }}
                  >
                    <option value="" style={{ background: '#171717' }}>Select country</option>
                    {countries.map((c) => (
                      <option key={c} value={c} style={{ background: '#171717' }}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium tracking-[0.05em] uppercase mb-2" style={{ color: '#A3A3A3' }}>
                    Purpose of contact
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-[#F5F5F5] outline-none focus:border-[#4ADE80] transition-colors duration-300 resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                {errorMsg && (
                  <div className="text-red-500 text-sm mt-2">{errorMsg}</div>
                )}

                <div className="mt-4">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6Les_AYtAAAAAHboDmcYzAhXZXdouokh2vw3NW4P"
                    onChange={(token) => setCaptchaToken(token)}
                    theme="dark"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#4ADE80] text-[#0A0A0A] font-medium px-8 py-3 rounded-full hover:scale-[1.02] transition-transform duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
