import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { EMAIL, INSTAGRAM_URL, PHONE_DISPLAY, WHATSAPP_NUMBER_E164 } from '../../constants/contact';
import { useMeta } from '../../hooks/useMeta';
import { PageNav } from '../../components/PageNav';

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const VP = { once: true, margin: '-80px' } as const;

const SERVICES = [
  { value: 'website',   label: 'Website',      sub: 'Design & Development', icon: 'ri-window-line'     },
  { value: 'marketing', label: 'Social Media',  sub: 'Marketing & Growth',   icon: 'ri-line-chart-line' },
  { value: 'both',      label: 'Both',          sub: 'Website + Marketing',  icon: 'ri-rocket-2-line'   },
  { value: 'unsure',    label: 'Not Sure Yet',  sub: "Let's talk it over",   icon: 'ri-question-line'   },
] as const;

type ServiceValue = typeof SERVICES[number]['value'];

function buildWhatsAppMessage(name: string, business: string, service: ServiceValue | '', message: string): string {
  const svc = SERVICES.find(s => s.value === service);
  const serviceLabel = svc ? `${svc.label} — ${svc.sub}` : service;
  const lines: string[] = [
    `Hello MomentumLB! 👋`,
    ``,
    `*Name:* ${name}`,
    `*Business:* ${business}`,
    `*Looking for:* ${serviceLabel}`,
  ];
  if (message) {
    lines.push(``, `*Details:*`, message);
  }
  lines.push(``, `_Sent via momentumlb.com_ ✨`);
  return lines.join('\n');
}

const steps = [
  {
    num: '01',
    icon: 'ri-file-list-3-line',
    title: 'Fill the Form',
    desc: "Tell us your name, business, and what you're looking for. Takes under a minute.",
  },
  {
    num: '02',
    icon: 'ri-whatsapp-line',
    title: 'WhatsApp Opens',
    desc: "We pre-fill a clean, professional message for you. Just tap Send in WhatsApp.",
  },
  {
    num: '03',
    icon: 'ri-rocket-2-line',
    title: 'We Get to Work',
    desc: "We reply within hours and walk you through the next steps to launch your project.",
  },
];

export default function ContactPage() {
  useMeta({
    title: 'Contact Us | MomentumLB',
    description: "Get in touch with MomentumLB. Fill out the form and we'll open WhatsApp with a ready-to-send message.",
    canonical: 'https://momentumlb.com/contact',
  });

  const [name, setName]         = useState('');
  const [business, setBusiness] = useState('');
  const [service, setService]   = useState<ServiceValue | ''>('');
  const [message, setMessage]   = useState('');
  const [errors, setErrors]     = useState<Record<string, string>>({});
  const [sent, setSent]         = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim())     e.name     = 'Please enter your name';
    if (!business.trim()) e.business = 'Please enter your business name';
    if (!service)         e.service  = 'Please select a service';
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const msg = buildWhatsAppMessage(name.trim(), business.trim(), service, message.trim());
    window.open(`https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  function reset() {
    setName(''); setBusiness(''); setService(''); setMessage('');
    setErrors({}); setSent(false);
  }

  function clearError(key: string) {
    setErrors(prev => { const n = { ...prev }; delete n[key]; return n; });
  }

  return (
    <div className="min-h-screen bg-[#020208] text-white overflow-x-hidden">
      <PageNav current="contact" />

      {/* ── Hero ── */}
      <section className="relative pt-32 sm:pt-40 pb-10 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#020208]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[400px] sm:h-[500px] bg-purple-700/12 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-dot-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-purple-400 mb-4 sm:mb-5">
              Let's Talk
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-5 tracking-tight">
              Start Your<br /><span className="gradient-text">Project Today</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-white/52 max-w-xl mx-auto leading-relaxed">
              Fill out the form below and we'll open WhatsApp with a ready-to-send message. Takes 30 seconds.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Form ── */}
      <section className="py-10 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#030409]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-700/7 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {sent ? (
              /* ── Success state ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-green-500/25 bg-gradient-to-br from-green-500/8 to-green-500/3 p-10 sm:p-14 text-center"
              >
                <div className="w-20 h-20 flex items-center justify-center bg-green-500/15 border border-green-500/30 rounded-full mx-auto mb-6">
                  <i className="ri-whatsapp-line text-4xl text-green-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">WhatsApp is Ready!</h2>
                <p className="text-white/55 text-sm sm:text-base leading-relaxed mb-2">
                  Your message has been pre-filled and WhatsApp should be open in a new tab.
                </p>
                <p className="text-white/40 text-sm mb-10">Just tap <span className="text-green-400 font-semibold">Send</span> and we'll get back to you within hours.</p>
                <button
                  onClick={reset}
                  className="px-8 py-3.5 bg-white/[0.06] hover:bg-white/[0.1] text-white/80 hover:text-white font-semibold rounded-2xl border border-white/[0.1] hover:border-white/20 transition-all duration-200 text-sm"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              /* ── Form state ── */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.015] p-7 sm:p-10 space-y-8"
              >
                {/* Service selector */}
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-3">
                    What are you looking for? <span className="text-purple-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {SERVICES.map(svc => {
                      const selected = service === svc.value;
                      return (
                        <button
                          key={svc.value}
                          type="button"
                          onClick={() => { setService(svc.value); clearError('service'); }}
                          className={`relative flex flex-col items-start gap-2 p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                            selected
                              ? 'border-purple-500/60 bg-purple-500/[0.12] shadow-lg shadow-purple-500/10'
                              : 'border-white/[0.08] bg-white/[0.02] hover:border-purple-400/30 hover:bg-purple-500/[0.05]'
                          }`}
                        >
                          <div className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors duration-200 ${selected ? 'bg-purple-500/25 border border-purple-400/40' : 'bg-white/[0.05] border border-white/[0.08]'}`}>
                            <i className={`${svc.icon} text-base ${selected ? 'text-purple-300' : 'text-white/45'}`} />
                          </div>
                          <div>
                            <p className={`text-sm font-bold leading-tight transition-colors duration-200 ${selected ? 'text-white' : 'text-white/70'}`}>{svc.label}</p>
                            <p className={`text-xs mt-0.5 transition-colors duration-200 ${selected ? 'text-purple-300/80' : 'text-white/35'}`}>{svc.sub}</p>
                          </div>
                          {selected && (
                            <div className="absolute top-3 right-3 w-5 h-5 flex items-center justify-center bg-purple-500 rounded-full">
                              <i className="ri-check-line text-[11px] text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {errors.service && (
                    <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
                      <i className="ri-error-warning-line" />{errors.service}
                    </p>
                  )}
                </div>

                {/* Name + Business row */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-white/80 mb-2">
                      Your Name <span className="text-purple-400">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={e => { setName(e.target.value); clearError('name'); }}
                      placeholder="e.g. Ahmad Khalil"
                      autoComplete="name"
                      className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border text-white placeholder:text-white/25 text-sm outline-none transition-all duration-200 focus:bg-white/[0.08] focus:ring-2 focus:ring-purple-500/30 ${errors.name ? 'border-red-500/50 focus:border-red-500/60' : 'border-white/[0.1] focus:border-purple-500/50'}`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                        <i className="ri-error-warning-line" />{errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="business" className="block text-sm font-semibold text-white/80 mb-2">
                      Business Name <span className="text-purple-400">*</span>
                    </label>
                    <input
                      id="business"
                      type="text"
                      value={business}
                      onChange={e => { setBusiness(e.target.value); clearError('business'); }}
                      placeholder="e.g. Zen Beauty Clinic"
                      autoComplete="organization"
                      className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border text-white placeholder:text-white/25 text-sm outline-none transition-all duration-200 focus:bg-white/[0.08] focus:ring-2 focus:ring-purple-500/30 ${errors.business ? 'border-red-500/50 focus:border-red-500/60' : 'border-white/[0.1] focus:border-purple-500/50'}`}
                    />
                    {errors.business && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                        <i className="ri-error-warning-line" />{errors.business}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-white/80 mb-2">
                    Anything else? <span className="text-white/30 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Tell us a bit about your business, your goals, timeline, or any questions you have…"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/25 text-sm outline-none transition-all duration-200 focus:bg-white/[0.08] focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30 resize-none leading-relaxed"
                  />
                </div>

                {/* Preview */}
                {(name || business || service) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5"
                  >
                    <p className="text-[11px] font-semibold tracking-widest uppercase text-white/30 mb-3 flex items-center gap-1.5">
                      <i className="ri-eye-line" /> WhatsApp Message Preview
                    </p>
                    <pre className="text-xs text-white/55 leading-relaxed whitespace-pre-wrap font-mono">
                      {buildWhatsAppMessage(name || 'Your Name', business || 'Your Business', service, message)}
                    </pre>
                  </motion.div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold rounded-2xl text-base transition-colors duration-200 flex items-center justify-center gap-2.5 shadow-xl shadow-green-500/20"
                >
                  <i className="ri-whatsapp-line text-xl" />
                  Open WhatsApp
                  <i className="ri-arrow-right-line" />
                </motion.button>

                <p className="text-center text-xs text-white/25">
                  This will open WhatsApp with your message pre-filled — nothing is sent automatically.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#020208]" />
        <div className="absolute inset-0 bg-dot-pattern opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] bg-purple-700/6 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div className="mb-16 sm:mb-20" variants={stagger} initial="hidden" whileInView="visible" viewport={VP}>
            <motion.span variants={fadeLeft} className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-purple-400 mb-4">The Process</motion.span>
            <motion.h2 variants={fadeLeft} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              How It Works
            </motion.h2>
          </motion.div>

          <div className="divide-y divide-white/[0.07]">
            {steps.map((step) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={VP}
                className="group relative flex items-start gap-5 sm:gap-10 py-10 sm:py-14 cursor-default"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/0 to-transparent opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500" />
                <div className="text-[3.5rem] sm:text-[5.5rem] lg:text-[7rem] font-black leading-none select-none flex-shrink-0 w-14 sm:w-24 lg:w-32 font-mono tracking-tight transition-colors duration-300 text-purple-600/35 group-hover:text-purple-500/55">
                  {step.num}
                </div>
                <div className="flex-1 pt-1 sm:pt-3 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl border bg-purple-500/15 border-purple-500/20 flex-shrink-0">
                      <i className={`${step.icon} text-lg text-purple-400`} />
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">{step.title}</h3>
                  </div>
                  <p className="text-white/62 text-sm sm:text-base leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
                <div className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full border border-white/[0.09] group-hover:border-purple-500/40 group-hover:bg-purple-500/10 transition-all duration-300 flex-shrink-0 self-center">
                  <i className="ri-arrow-right-line text-white/25 group-hover:text-purple-400 transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Info strip ── */}
      <section className="py-12 sm:py-16 relative overflow-hidden border-y border-white/[0.05]">
        <div className="absolute inset-0 bg-[#030409]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div
            className="grid sm:grid-cols-3 gap-6 text-center"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            {[
              { icon: 'ri-time-line',       stat: '< 24h',   label: 'Average response time' },
              { icon: 'ri-calendar-line',   stat: '2 Weeks', label: 'Typical project delivery' },
              { icon: 'ri-map-pin-2-line',  stat: 'Lebanon', label: 'Serving businesses locally' },
            ].map((item) => (
              <motion.div key={item.label} variants={fadeUp} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center bg-purple-500/10 border border-purple-500/20 rounded-xl">
                  <i className={`${item.icon} text-xl text-purple-400`} />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{item.stat}</p>
                <p className="text-sm text-white/45">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#030409] border-t border-white/[0.05] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/momentumLOGO.jpeg" alt="MomentumLB" className="w-9 h-9 object-contain rounded-xl" />
                <span className="text-base font-bold text-white">MomentumLB</span>
              </div>
              <p className="text-sm text-white/32 mb-5 leading-relaxed">Building modern websites and growing brands for local businesses across Lebanon.</p>
              <div className="flex gap-3">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center bg-white/[0.04] hover:bg-purple-500/20 border border-white/[0.07] hover:border-purple-500/40 rounded-xl transition-all duration-200" aria-label="Instagram">
                  <i className="ri-instagram-line text-sm text-white/62" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-5">Quick Links</h3>
              <ul className="space-y-3">
                {[{ label: 'Home', to: '/' }, { label: 'Projects', to: '/projects' }, { label: 'Services', to: '/services' }, { label: 'Marketing', to: '/marketing' }, { label: 'Contact', to: '/contact' }].map((l) => (
                  <li key={l.label}><Link to={l.to} className="text-sm text-white/32 hover:text-white transition-colors duration-200">{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-5">Contact</h3>
              <ul className="space-y-3">
                <li><a href={`mailto:${EMAIL}`} className="flex items-center gap-2.5 text-sm text-white/32 hover:text-white transition-colors duration-200"><i className="ri-mail-line text-purple-400 flex-shrink-0" />{EMAIL}</a></li>
                <li><a href={`https://wa.me/${WHATSAPP_NUMBER_E164}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-white/32 hover:text-white transition-colors duration-200"><i className="ri-whatsapp-line text-purple-400 flex-shrink-0" />{PHONE_DISPLAY}</a></li>
                <li className="flex items-center gap-2.5 text-sm text-white/32"><i className="ri-map-pin-line text-purple-400 flex-shrink-0" />Beirut, Lebanon</li>
              </ul>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/20">© 2025 MomentumLB. All rights reserved.</p>
            <p className="text-xs text-white/20">Crafted with precision in Lebanon 🇱🇧</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
