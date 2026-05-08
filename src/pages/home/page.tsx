import { Link } from 'react-router-dom';
import { projects } from '../../mocks/projects';
import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  EMAIL,
  INSTAGRAM_URL,
  MAILTO_URL,
  PHONE_DISPLAY,
  WHATSAPP_URL,
} from '../../constants/contact';
import { HeroPortals } from '../../components/HeroPortals';
import { useMeta } from '../../hooks/useMeta';

// ─── Shared animation variants ─────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.93, y: 28 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const VP = { once: true, margin: '-80px' } as const;

// ─── Cursor glow ────────────────────────────────────────────────────────────

function CursorGlow() {
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const sx = useSpring(mx, { stiffness: 55, damping: 22 });
  const sy = useSpring(my, { stiffness: 55, damping: 22 });

  useEffect(() => {
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mx, my]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[990] hidden lg:block"
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
        width: 560,
        height: 560,
        background:
          'radial-gradient(circle, rgba(124,58,237,0.09) 0%, rgba(124,58,237,0.03) 45%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function HomePage() {
  useMeta({
    title: 'MomentumLB – Web Development & Marketing Agency in Lebanon',
    description:
      'MomentumLB builds fast, modern websites and runs social media marketing for restaurants, clinics, gyms, and local businesses in Lebanon. Real results, real growth.',
    canonical: 'https://momentumlb.com/',
  });


  const industries = [
    { icon: 'ri-windy-line',          label: 'HVAC' },
    { icon: 'ri-drop-line',           label: 'Perfume Stores' },
    { icon: 'ri-shopping-bag-3-line', label: 'E‑Commerce' },
    { icon: 'ri-restaurant-line',     label: 'Restaurants' },
    { icon: 'ri-cup-line',            label: 'Cafés' },
    { icon: 'ri-heart-pulse-line',    label: 'Beauty Clinics' },
    { icon: 'ri-run-line',            label: 'Gyms' },
    { icon: 'ri-store-3-line',        label: 'Retail Brands' },
  ];

  const websiteProjects = projects.filter((p) => p.website);

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

  const marketingServices = [
    { icon: 'ri-instagram-line',    title: 'Social Media Management',  desc: 'Daily posting, engagement, and growth strategies across Instagram, Facebook, and TikTok.' },
    { icon: 'ri-palette-line',      title: 'Content Creation',          desc: 'Photos, videos, graphics and captions that capture attention and drive real engagement.' },
    { icon: 'ri-advertisement-line',title: 'Paid Ads (Meta / Google)',  desc: 'Targeted campaigns on Facebook, Instagram, and Google to reach your ideal customers.' },
    { icon: 'ri-line-chart-line',   title: 'Brand Growth Strategy',    desc: 'Data-driven strategies to grow followers, engagement, and conversions for your business.' },
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

  return (
    <div className="min-h-screen bg-[#020208] text-white overflow-x-hidden">

      <CursorGlow />


      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden">

        <HeroPortals />
      </section>

      {/* ═══════════════════════════════════════════════════════
          WHAT WE DO
      ═══════════════════════════════════════════════════════ */}
      <section id="what-we-do" className="py-20 sm:py-28 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020208] via-[#06040f] to-[#020208]" />
        <div className="absolute inset-0 bg-dot-pattern opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[500px] sm:w-[700px] h-[500px] sm:h-[700px]
          bg-purple-700/7 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">

          {/* Header */}
          <motion.div
            className="text-center mb-14 sm:mb-18"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.18em]
              uppercase text-purple-400 mb-4">
              What We Do
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white
              mb-4 tracking-tight">
              Choose Your Path to<br />
              <span className="gradient-text">Business Growth</span>
            </h2>
            <p className="text-white/62 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Whether you need a stunning website or a powerful social media presence,
              we've got you covered.
            </p>
          </motion.div>

          {/* Two cards */}
          <motion.div
            className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            {/* Website card */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -9, scale: 1.015 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl overflow-hidden border border-white/[0.09]
                bg-gradient-to-br from-white/[0.05] to-white/[0.02]
                hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/15
                transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/4
                group-hover:from-purple-600/10 group-hover:to-purple-600/8
                transition-all duration-500" />
              <div className="relative p-8 sm:p-10">
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 4 }}
                  className="w-14 h-14 flex items-center justify-center
                    bg-purple-500/15 border border-purple-500/30 rounded-2xl mb-7
                    transition-colors duration-300 group-hover:bg-purple-500/25"
                >
                  <i className="ri-window-line text-2xl sm:text-3xl text-purple-400" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 tracking-tight">
                  Website Development
                </h3>
                <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-7">
                  Fast, modern, and mobile-optimized websites designed to convert
                  visitors into customers. Perfect for restaurants, clinics, gyms,
                  and local businesses.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Responsive Design', 'SEO Optimized', 'Fast Loading', 'WhatsApp Integration'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                      <span className="w-5 h-5 flex items-center justify-center
                        bg-purple-500/20 rounded-full flex-shrink-0">
                        <i className="ri-check-line text-purple-400 text-xs" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600
                    hover:bg-purple-500 text-white text-sm font-semibold rounded-full
                    transition-all duration-200 hover:scale-105 hover:shadow-lg
                    hover:shadow-purple-500/30"
                >
                  View Our Websites <i className="ri-arrow-right-line" />
                </a>
              </div>
            </motion.div>

            {/* Marketing card */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -9, scale: 1.015 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl overflow-hidden border border-white/[0.09]
                bg-gradient-to-br from-white/[0.05] to-white/[0.02]
                hover:border-fuchsia-500/40 hover:shadow-2xl hover:shadow-fuchsia-500/15
                transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/0 to-violet-600/4
                group-hover:from-fuchsia-600/10 group-hover:to-violet-600/8
                transition-all duration-500" />
              <div className="relative p-8 sm:p-10">
                <motion.div
                  whileHover={{ scale: 1.12, rotate: -4 }}
                  className="w-14 h-14 flex items-center justify-center
                    bg-fuchsia-500/15 border border-fuchsia-500/30 rounded-2xl mb-7
                    transition-colors duration-300 group-hover:bg-fuchsia-500/25"
                >
                  <i className="ri-megaphone-line text-2xl sm:text-3xl text-fuchsia-400" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 tracking-tight">
                  Marketing & Social Media
                </h3>
                <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-7">
                  Grow your brand on Instagram, Facebook, and TikTok with targeted
                  campaigns and compelling content that drives real business results.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Content Creation', 'Social Media Management', 'Paid Advertising', 'Analytics & Reporting'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                      <span className="w-5 h-5 flex items-center justify-center
                        bg-fuchsia-500/20 rounded-full flex-shrink-0">
                        <i className="ri-check-line text-fuchsia-400 text-xs" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#marketing"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-fuchsia-600
                    hover:bg-fuchsia-500 text-white text-sm font-semibold rounded-full
                    transition-all duration-200 hover:scale-105 hover:shadow-lg
                    hover:shadow-fuchsia-500/30"
                >
                  Explore Marketing <i className="ri-arrow-right-line" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          INDUSTRIES TICKER
      ═══════════════════════════════════════════════════════ */}
      <section
        aria-hidden
        className="relative py-10 sm:py-14 overflow-hidden border-y border-white/[0.05]"
      >
        <div className="absolute inset-0 bg-[#030409]" />
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40
          bg-gradient-to-r from-[#030409] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40
          bg-gradient-to-l from-[#030409] to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div className="flex gap-4 animate-ticker-ltr flex-none">
            {[...industries, ...industries].map((item, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full
                  border border-white/[0.09] bg-white/[0.03] whitespace-nowrap flex-shrink-0"
              >
                <i className={`${item.icon} text-purple-400 text-base`} />
                <span className="text-sm font-medium text-white/65">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PROJECTS
      ═══════════════════════════════════════════════════════ */}
      <section id="projects" className="py-20 sm:py-28 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020208] via-[#04020e] to-[#020208]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-40
          bg-gradient-to-b from-transparent via-purple-500/40 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">

          {/* Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.18em]
              uppercase text-purple-400 mb-4">
              Our Work
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white
              mb-4 tracking-tight">
              Websites We Built<br />
              <span className="gradient-text">for Businesses</span>
            </h2>
            <p className="text-white/62 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Real projects. Real results. Every site is crafted to convert visitors
              into loyal customers.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            {websiteProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={scaleIn}
                whileHover={{ y: -7 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-2xl overflow-hidden border border-white/[0.07]
                  bg-white/[0.025] hover:border-purple-500/40
                  hover:shadow-2xl hover:shadow-purple-500/10
                  transition-all duration-500"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={project.website!.screenshot}
                    alt={project.name}
                    className="w-full h-full object-cover object-top
                      group-hover:scale-[1.06] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t
                    from-black/80 via-black/15 to-transparent" />
                  <div className="absolute inset-0 bg-purple-600/0
                    group-hover:bg-purple-600/8 transition-colors duration-400" />
                  {/* Industry badge */}
                  <div className="absolute top-3 left-3 px-3 py-1
                    bg-black/60 backdrop-blur-sm rounded-full border border-white/[0.09]
                    text-xs text-white/70 font-medium">
                    {project.industry}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-3 tracking-tight">
                    {project.name}
                  </h3>
                  <ul className="space-y-1.5 mb-5">
                    {project.website!.features.map((feat, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-sm text-white/62">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400/70 flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 sm:gap-3">
                    <Link
                      to={`/case-study/${project.id}`}
                      className={`px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white
                        text-xs sm:text-sm font-semibold rounded-xl transition-all
                        duration-200 text-center hover:scale-[1.02]
                        ${project.website!.liveUrl ? 'flex-1' : 'w-full'}`}
                    >
                      View Case Study
                    </Link>
                    {project.website!.liveUrl && (
                      <a
                        href={project.website!.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2.5 bg-white/[0.04] hover:bg-white/[0.09]
                          text-white/65 hover:text-white text-xs sm:text-sm font-medium
                          rounded-xl border border-white/[0.09] flex items-center
                          justify-center gap-1.5 transition-all duration-200"
                      >
                        Visit <i className="ri-external-link-line" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center mt-10 sm:mt-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/[0.13]
                hover:border-purple-500/50 text-white/65 hover:text-white text-sm font-semibold
                rounded-full transition-all duration-200 hover:bg-purple-500/10 hover:scale-105"
            >
              View All Projects <i className="ri-arrow-right-line" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          WEB SERVICES — NUMBERED
      ═══════════════════════════════════════════════════════ */}
      <section id="services" className="py-20 sm:py-28 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#030409]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-70" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[460px] h-[460px] bg-purple-700/6 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">

          <motion.div
            className="mb-16 sm:mb-20"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <motion.span
              variants={fadeLeft}
              className="inline-block text-xs font-semibold tracking-[0.18em]
                uppercase text-purple-400 mb-4"
            >
              What We Offer
            </motion.span>
            <motion.h2
              variants={fadeLeft}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
            >
              Our Services
            </motion.h2>
          </motion.div>

          {/* Numbered rows */}
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
                  className="group relative flex items-start gap-5 sm:gap-10 py-10 sm:py-14
                    cursor-default"
                >
                  {/* Hover bg glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r
                    from-purple-600/0 to-transparent opacity-0 group-hover:opacity-[0.04]
                    transition-opacity duration-500" />

                  {/* Large number */}
                  <div
                    className={`text-[3.5rem] sm:text-[5.5rem] lg:text-[7rem] font-black
                      leading-none select-none flex-shrink-0 w-14 sm:w-24 lg:w-32
                      font-mono tracking-tight transition-colors duration-300 ${c.numText}`}
                  >
                    {svc.num}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1 sm:pt-3 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-xl
                        border ${c.iconBg} flex-shrink-0`}>
                        <i className={`${svc.icon} text-lg ${c.iconText}`} />
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold
                        text-white tracking-tight">
                        {svc.title}
                      </h3>
                    </div>
                    <p className="text-white/62 text-sm sm:text-base leading-relaxed max-w-2xl">
                      {svc.desc}
                    </p>
                  </div>

                  {/* Arrow chip */}
                  <div className="hidden sm:flex items-center justify-center
                    w-11 h-11 rounded-full border border-white/[0.09]
                    group-hover:border-purple-500/40 group-hover:bg-purple-500/10
                    transition-all duration-300 flex-shrink-0 self-center">
                    <i className="ri-arrow-right-line text-white/25
                      group-hover:text-purple-400 transition-colors duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MARKETING SERVICES
      ═══════════════════════════════════════════════════════ */}
      <section id="marketing" className="py-20 sm:py-28 lg:py-36 relative overflow-hidden
        border-y border-white/[0.05]">
        <div className="absolute inset-0 bg-[#020208]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[500px] h-[500px] bg-fuchsia-700/6 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">

          <motion.div
            className="text-center mb-12 sm:mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.18em]
              uppercase text-fuchsia-400 mb-4">
              Marketing Services
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white
              mb-4 tracking-tight">
              Grow Your Brand on<br />
              <span className="gradient-text-warm">Social Media</span>
            </h2>
            <p className="text-white/62 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              From content creation to paid ads, we build a powerful presence
              that attracts and converts customers.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            {marketingServices.map((svc) => (
              <motion.div
                key={svc.title}
                variants={scaleIn}
                whileHover={{ y: -7, scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group relative p-6 sm:p-8 rounded-2xl border border-white/[0.07]
                  bg-white/[0.02] hover:border-fuchsia-500/30
                  hover:shadow-xl hover:shadow-fuchsia-500/10
                  transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/0 to-purple-600/4
                  group-hover:from-fuchsia-600/8 group-hover:to-purple-600/10
                  transition-all duration-500" />
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 flex items-center justify-center
                      bg-fuchsia-500/15 border border-fuchsia-500/20 rounded-xl mb-5
                      transition-colors duration-300 group-hover:bg-fuchsia-500/25"
                  >
                    <i className={`${svc.icon} text-xl text-fuchsia-400`} />
                  </motion.div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-3 tracking-tight">
                    {svc.title}
                  </h3>
                  <p className="text-white/62 text-sm leading-relaxed">{svc.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TRUSTED BY — CLIENT TICKER
      ═══════════════════════════════════════════════════════ */}
      <section className="relative py-14 sm:py-20 overflow-hidden border-b border-white/[0.05]">
        <div className="absolute inset-0 bg-[#030409]" />

        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16
            mb-10 sm:mb-14 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.18em]
            uppercase text-purple-400 mb-4">
            Trusted By
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Businesses We've Worked With
          </h2>
        </motion.div>

        {/* Client marquee */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36
            bg-gradient-to-r from-[#030409] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36
            bg-gradient-to-l from-[#030409] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-ticker-rtl" aria-hidden>
            {[...projects, ...projects, ...projects, ...projects].map((p, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-3 flex items-center gap-3 px-6 py-4
                  rounded-2xl border border-white/[0.07] bg-white/[0.02] whitespace-nowrap"
              >
                <div className="w-8 h-8 flex items-center justify-center
                  bg-purple-500/15 rounded-xl flex-shrink-0">
                  <i className="ri-building-line text-purple-400 text-sm" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white/80">{p.name}</div>
                  <div className="text-xs text-white/30">{p.industry}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CONTACT CTA
      ═══════════════════════════════════════════════════════ */}
      <section id="contact" className="relative py-28 sm:py-36 lg:py-44 overflow-hidden">
        <div className="absolute inset-0 bg-[#020208]" />
        <div className="absolute inset-0 bg-grid-pattern" />
        {/* Radial glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[700px] h-[700px] bg-purple-600/13 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[350px] h-[350px] bg-fuchsia-500/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[150px] h-[150px] bg-white/5 rounded-full blur-[40px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs font-semibold tracking-[0.2em]
                uppercase text-purple-400 mb-5 sm:mb-6"
            >
              Let's Talk
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold
                text-white mb-5 sm:mb-6 leading-tight tracking-tight"
            >
              Ready to Grow<br />
              <span className="gradient-text">Your Business?</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-white/62 leading-relaxed
                mb-10 sm:mb-12 max-w-xl mx-auto"
            >
              Whether you need a website, social media growth, or both — we're here
              to help your business succeed online.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold
                  rounded-full transition-colors duration-200 hover:shadow-xl
                  hover:shadow-green-500/25 flex items-center justify-center gap-2"
              >
                <i className="ri-whatsapp-line text-xl" />
                Contact on WhatsApp
              </motion.a>
              <motion.a
                href={MAILTO_URL}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-white/[0.05] hover:bg-white/[0.09] text-white
                  font-semibold rounded-full border border-white/[0.14] hover:border-white/25
                  transition-all duration-200 flex items-center justify-center gap-2"
              >
                <i className="ri-mail-line text-xl" />
                Send Email
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════ */}
      <footer className="bg-[#030409] border-t border-white/[0.05] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            gap-8 sm:gap-12 mb-10 sm:mb-12">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/images/momentumLOGO.jpeg"
                  alt="MomentumLB"
                  className="w-9 h-9 object-contain rounded-xl"
                />
                <span className="text-base font-bold text-white">MomentumLB</span>
              </div>
              <p className="text-sm text-white/32 mb-5 leading-relaxed">
                Building modern websites and growing brands for local businesses across Lebanon.
              </p>
              <div className="flex gap-3">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-white/[0.04]
                    hover:bg-purple-500/20 border border-white/[0.07]
                    hover:border-purple-500/40 rounded-xl transition-all duration-200"
                  aria-label="Instagram"
                >
                  <i className="ri-instagram-line text-sm text-white/62
                    hover:text-purple-400 transition-colors" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-5">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { label: 'Projects',  href: '#projects' },
                  { label: 'Services',  href: '#services' },
                  { label: 'Marketing', href: '#marketing' },
                  { label: 'Contact',   href: '#contact' },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/32 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    to="/projects"
                    className="text-sm text-white/32 hover:text-white transition-colors duration-200"
                  >
                    All Projects
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-5">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={MAILTO_URL}
                    className="flex items-center gap-2.5 text-sm text-white/32
                      hover:text-white transition-colors duration-200"
                  >
                    <i className="ri-mail-line text-purple-400 flex-shrink-0" />
                    {EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-white/32
                      hover:text-white transition-colors duration-200"
                  >
                    <i className="ri-whatsapp-line text-purple-400 flex-shrink-0" />
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-white/32">
                  <i className="ri-map-pin-line text-purple-400 flex-shrink-0" />
                  Beirut, Lebanon
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row
            items-center justify-between gap-3">
            <p className="text-xs text-white/20">© 2025 MomentumLB. All rights reserved.</p>
            <p className="text-xs text-white/20">Crafted with precision in Lebanon 🇱🇧</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
