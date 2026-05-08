import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { INSTAGRAM_URL, MAILTO_URL, PHONE_DISPLAY, WHATSAPP_URL, EMAIL } from '../../constants/contact';
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
const scaleIn = {
  hidden: { opacity: 0, scale: 0.93, y: 28 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const VP = { once: true, margin: '-80px' } as const;

const services = [
  {
    num: '01',
    icon: 'ri-store-3-line',
    title: 'Business Websites',
    desc: 'Modern, fast websites for restaurants, gyms, clinics and all local businesses — built to impress and convert.',
    color: 'purple' as const,
  },
  {
    num: '02',
    icon: 'ri-restaurant-line',
    title: 'Restaurant Menu Sites',
    desc: 'Beautiful digital menus optimized for mobile ordering, with WhatsApp integration and delivery info.',
    color: 'fuchsia' as const,
  },
  {
    num: '03',
    icon: 'ri-rocket-2-line',
    title: 'Landing Pages',
    desc: 'High-converting landing pages for promotions, services, and campaigns — designed to drive action.',
    color: 'violet' as const,
  },
];

const colorMap = {
  purple: {
    numText: 'text-purple-600/35 group-hover:text-purple-500/55',
    iconBg: 'bg-purple-500/15 border-purple-500/20',
    iconText: 'text-purple-400',
  },
  fuchsia: {
    numText: 'text-fuchsia-600/35 group-hover:text-fuchsia-500/55',
    iconBg: 'bg-fuchsia-500/15 border-fuchsia-500/20',
    iconText: 'text-fuchsia-400',
  },
  violet: {
    numText: 'text-violet-600/35 group-hover:text-violet-500/55',
    iconBg: 'bg-violet-500/15 border-violet-500/20',
    iconText: 'text-violet-400',
  },
};

export default function ServicesPage() {
  useMeta({
    title: 'Services – Web Development & Marketing | MomentumLB',
    description: 'MomentumLB offers professional web development and social media marketing for local businesses in Lebanon. Explore our services.',
    canonical: 'https://momentumlb.com/services',
  });

  return (
    <div className="min-h-screen bg-[#020208] text-white overflow-x-hidden">

      <PageNav current="services" />

      {/* Hero */}
      <section className="relative pt-32 sm:pt-40 pb-12 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#020208]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-purple-700/12 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-dot-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-purple-400 mb-4 sm:mb-5">
              What We Offer
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-5 tracking-tight">
              Our <span className="gradient-text">Services</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-white/52 max-w-2xl mx-auto leading-relaxed">
              From stunning websites to full-scale social media marketing — everything your business needs to grow online.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* What We Do — two cards */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020208] via-[#06040f] to-[#020208]" />
        <div className="absolute inset-0 bg-dot-pattern opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-purple-700/7 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div className="text-center mb-14 sm:mb-18" variants={fadeUp} initial="hidden" whileInView="visible" viewport={VP}>
            <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-purple-400 mb-4">What We Do</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Choose Your Path to<br /><span className="gradient-text">Business Growth</span>
            </h2>
            <p className="text-white/62 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Whether you need a stunning website or a powerful social media presence, we've got you covered.
            </p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto" variants={stagger} initial="hidden" whileInView="visible" viewport={VP}>
            {/* Website card */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -9, scale: 1.015 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl overflow-hidden border border-white/[0.09] bg-gradient-to-br from-white/[0.05] to-white/[0.02] hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/15 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/4 group-hover:from-purple-600/10 group-hover:to-purple-600/8 transition-all duration-500" />
              <div className="relative p-8 sm:p-10">
                <motion.div whileHover={{ scale: 1.12, rotate: 4 }} className="w-14 h-14 flex items-center justify-center bg-purple-500/15 border border-purple-500/30 rounded-2xl mb-7 transition-colors duration-300 group-hover:bg-purple-500/25">
                  <i className="ri-window-line text-2xl sm:text-3xl text-purple-400" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 tracking-tight">Website Development</h3>
                <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-7">
                  Fast, modern, and mobile-optimized websites designed to convert visitors into customers. Perfect for restaurants, clinics, gyms, and local businesses.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Responsive Design', 'SEO Optimized', 'Fast Loading', 'WhatsApp Integration'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                      <span className="w-5 h-5 flex items-center justify-center bg-purple-500/20 rounded-full flex-shrink-0">
                        <i className="ri-check-line text-purple-400 text-xs" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30">
                  View Our Websites <i className="ri-arrow-right-line" />
                </Link>
              </div>
            </motion.div>

            {/* Marketing card */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -9, scale: 1.015 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl overflow-hidden border border-white/[0.09] bg-gradient-to-br from-white/[0.05] to-white/[0.02] hover:border-fuchsia-500/40 hover:shadow-2xl hover:shadow-fuchsia-500/15 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/0 to-violet-600/4 group-hover:from-fuchsia-600/10 group-hover:to-violet-600/8 transition-all duration-500" />
              <div className="relative p-8 sm:p-10">
                <motion.div whileHover={{ scale: 1.12, rotate: -4 }} className="w-14 h-14 flex items-center justify-center bg-fuchsia-500/15 border border-fuchsia-500/30 rounded-2xl mb-7 transition-colors duration-300 group-hover:bg-fuchsia-500/25">
                  <i className="ri-megaphone-line text-2xl sm:text-3xl text-fuchsia-400" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 tracking-tight">Marketing & Social Media</h3>
                <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-7">
                  Grow your brand on Instagram, Facebook, and TikTok with targeted campaigns and compelling content that drives real business results.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Content Creation', 'Social Media Management', 'Paid Advertising', 'Analytics & Reporting'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                      <span className="w-5 h-5 flex items-center justify-center bg-fuchsia-500/20 rounded-full flex-shrink-0">
                        <i className="ri-check-line text-fuchsia-400 text-xs" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/marketing" className="inline-flex items-center gap-2 px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-fuchsia-500/30">
                  Explore Marketing <i className="ri-arrow-right-line" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Numbered services */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#030409]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-70" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] bg-purple-700/6 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <motion.div className="mb-16 sm:mb-20" variants={stagger} initial="hidden" whileInView="visible" viewport={VP}>
            <motion.span variants={fadeLeft} className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-purple-400 mb-4">Web Packages</motion.span>
            <motion.h2 variants={fadeLeft} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Website Types
            </motion.h2>
          </motion.div>

          <div className="divide-y divide-white/[0.07]">
            {services.map((svc) => {
              const c = colorMap[svc.color];
              return (
                <motion.div
                  key={svc.num}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VP}
                  className="group relative flex items-start gap-5 sm:gap-10 py-10 sm:py-14 cursor-default"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/0 to-transparent opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500" />
                  <div className={`text-[3.5rem] sm:text-[5.5rem] lg:text-[7rem] font-black leading-none select-none flex-shrink-0 w-14 sm:w-24 lg:w-32 font-mono tracking-tight transition-colors duration-300 ${c.numText}`}>
                    {svc.num}
                  </div>
                  <div className="flex-1 pt-1 sm:pt-3 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-xl border ${c.iconBg} flex-shrink-0`}>
                        <i className={`${svc.icon} text-lg ${c.iconText}`} />
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">{svc.title}</h3>
                    </div>
                    <p className="text-white/62 text-sm sm:text-base leading-relaxed max-w-2xl">{svc.desc}</p>
                  </div>
                  <div className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full border border-white/[0.09] group-hover:border-purple-500/40 group-hover:bg-purple-500/10 transition-all duration-300 flex-shrink-0 self-center">
                    <i className="ri-arrow-right-line text-white/25 group-hover:text-purple-400 transition-colors duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#020208]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={VP}>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 tracking-tight">
              Ready to get<br /><span className="gradient-text">started?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/55 text-base sm:text-lg mb-10 leading-relaxed">
              Tell us about your project and we'll get back to you within 24 hours.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-full transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30">
                Contact Us <i className="ri-arrow-right-line" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
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
                <li><a href={MAILTO_URL} className="flex items-center gap-2.5 text-sm text-white/32 hover:text-white transition-colors duration-200"><i className="ri-mail-line text-purple-400 flex-shrink-0" />{EMAIL}</a></li>
                <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-white/32 hover:text-white transition-colors duration-200"><i className="ri-whatsapp-line text-purple-400 flex-shrink-0" />{PHONE_DISPLAY}</a></li>
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
