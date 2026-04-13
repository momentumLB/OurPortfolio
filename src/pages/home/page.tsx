import { Link } from 'react-router-dom';
import { projects } from '../../mocks/projects';
import { useEffect, useRef, useState } from 'react';
import { EMAIL, INSTAGRAM_URL, MAILTO_URL, PHONE_DISPLAY, WHATSAPP_URL } from '../../constants/contact';
import { HeroStatCounters } from '../../components/HeroStatCounters';

export default function HomePage() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollRaf = useRef<number>(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(scrollRaf.current);
      scrollRaf.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const doc = document.documentElement;
        const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
        setScrollProgress(Math.min(1, y / maxScroll));
        setScrolled(y > 40);
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(scrollRaf.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-scroll-from-right');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -10% 0px' }
    );
    const elements = document.querySelectorAll('.observe-animation');
    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans overflow-x-hidden">

      {/* ── Navigation ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/40' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="Scroll to top"
            >
              <img
                src="/images/momentumLOGO.jpeg"
                alt=""
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg"
              />
              <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">MomentumLB</span>
            </Link>
            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {['Projects', 'Services', 'Marketing', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-white/60 hover:text-white transition-colors cursor-pointer">
                  {item}
                </a>
              ))}
            </div>
            <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 whitespace-nowrap cursor-pointer">
              Get Started <i className="ri-arrow-right-line"></i>
            </a>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <i className={`text-xl ${menuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 px-4 py-4 flex flex-col gap-4">
            {['Projects', 'Services', 'Marketing', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white/70 hover:text-white transition-colors py-2 cursor-pointer">
                {item}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-2 px-5 py-3 bg-purple-600 text-white text-sm font-semibold rounded-full text-center whitespace-nowrap cursor-pointer">
              Get Started
            </a>
          </div>
        )}
      </nav>

      {/* Scroll-synced neon center line (behind main content) */}
      <div
        className="pointer-events-none fixed inset-0 hidden sm:flex justify-center motion-reduce:hidden"
        aria-hidden
      >
        <div className="relative h-full w-0 shrink-0">
          {/* Base rail */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-purple-500/35 to-transparent"
            style={{
              boxShadow:
                '0 0 12px rgba(168, 85, 247, 0.35), 0 0 28px rgba(124, 58, 237, 0.2)',
            }}
          />
          {/* Bright segment that travels with scroll (28% tall, moves 0%→72% top) */}
          <div
            className="neon-scroll-segment absolute left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-fuchsia-400 via-purple-400 to-violet-500 will-change-[top]"
            style={{
              height: '28%',
              top: `${scrollProgress * 72}%`,
              boxShadow:
                '0 0 14px rgba(192, 132, 252, 0.65), 0 0 32px rgba(139, 92, 246, 0.35)',
            }}
          />
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen min-h-[100dvh] items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#050508]"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 h-full w-full">
            <img
              src="/images/HeroPortfolio.jpg"
              alt=""
              className="pointer-events-none h-full w-full select-none object-cover object-center opacity-[0.82]"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/88 to-[#080808]/25"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/70"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
        </div>
        <div className="animate-hero-vignette-drift absolute top-1/3 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/18 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="animate-hero-vignette-drift absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-violet-500/12 rounded-full blur-[100px] pointer-events-none [animation-delay:-4s]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-24 sm:pt-32 pb-16 sm:pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6 sm:mb-8 animate-slide-left">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse flex-shrink-0"></span>
                <span className="text-[10px] sm:text-xs font-semibold text-purple-300 tracking-widest uppercase">Web Development & Marketing · Lebanon</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.1] mb-8 sm:mb-10 animate-slide-left" style={{ animationDelay: '0.1s' }}>
                Websites & Marketing<br />
                <span className="gradient-text">That Drive Growth</span><br />
                for Local Businesses
              </h1>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-slide-left" style={{ animationDelay: '0.3s' }}>
                <a href="#what-we-do" className="px-6 sm:px-8 py-3 sm:py-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-full transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 whitespace-nowrap cursor-pointer text-sm sm:text-base">
                  Explore Services
                </a>
                <a href="#contact" className="px-6 sm:px-8 py-3 sm:py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/15 hover:border-white/30 transition-all hover:scale-105 whitespace-nowrap cursor-pointer text-sm sm:text-base">
                  Contact Us
                </a>
              </div>
              <HeroStatCounters />
            </div>

            {/* Right – laptop mockup (desktop only) */}
            <div className="relative animate-slide-right hidden lg:block" style={{ animationDelay: '0.2s' }}>
              <div className="animate-float">
                <div className="absolute -inset-8 bg-purple-600/15 rounded-3xl blur-3xl"></div>
                <div className="relative animate-pulse-glow rounded-2xl">
                  <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl p-3 shadow-2xl border border-white/10">
                    <div className="bg-zinc-900 rounded-t-xl px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                      </div>
                      <div className="flex-1 bg-zinc-800 rounded-md px-3 py-1 text-xs text-zinc-500 ml-2 flex items-center gap-1.5 min-w-0">
                        <i className="ri-lock-line text-green-400 text-xs flex-shrink-0"></i>
                        <span className="truncate">annascarelb.com</span>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-b-xl">
                      <img src={projects.filter((p) => p.website)[0]?.website?.screenshot ?? ''} alt="Website Preview" className="w-full h-auto object-cover object-top" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -left-6 bg-zinc-900 border border-white/10 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center bg-green-500/20 rounded-xl flex-shrink-0">
                      <i className="ri-line-chart-line text-green-400 text-lg"></i>
                    </div>
                    <div>
                      <div className="text-xs text-white/40">Monthly Visitors</div>
                      <div className="text-sm font-bold text-white">+340% Growth</div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-6 bg-zinc-900 border border-white/10 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center bg-purple-500/20 rounded-xl flex-shrink-0">
                      <i className="ri-speed-line text-purple-400 text-lg"></i>
                    </div>
                    <div>
                      <div className="text-xs text-white/40">Page Speed</div>
                      <div className="text-sm font-bold text-white">98 / 100</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-hero-scroll-hint absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 hidden md:flex">
          <span className="text-xs tracking-widest uppercase text-white/55">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent rounded-full"></div>
        </div>
      </section>

      {/* ── What We Do Section ── */}
      <section id="what-we-do" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#0d0d0d] to-[#080808]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-purple-700/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-10 sm:mb-16 observe-animation">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-400 mb-4">What We Do</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Choose Your Path to<br />
              <span className="gradient-text">Business Growth</span>
            </h2>
            <p className="text-white/45 text-base sm:text-lg max-w-2xl mx-auto">Whether you need a stunning website or powerful social media presence, we've got you covered.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Website Card */}
            <div className="observe-animation group relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] hover:border-purple-500/40 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-600/0 to-purple-600/5 group-hover:from-purple-600/10 group-hover:via-purple-600/5 group-hover:to-purple-600/10 transition-all duration-500"></div>
              <div className="relative p-6 sm:p-10">
                <div className="w-14 h-14 flex items-center justify-center bg-purple-500/15 border border-purple-500/30 rounded-2xl mb-5 sm:mb-6 group-hover:bg-purple-500/25 group-hover:scale-110 transition-all duration-300">
                  <i className="ri-window-line text-2xl sm:text-3xl text-purple-400"></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 sm:mb-4">Website Development</h3>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                  Fast, modern, and mobile-optimized websites designed to convert visitors into customers. Perfect for restaurants, clinics, gyms, and local businesses.
                </p>
                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                  {['Responsive Design', 'SEO Optimized', 'Fast Loading', 'WhatsApp Integration'].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-white/60">
                      <span className="w-5 h-5 flex items-center justify-center bg-purple-500/20 rounded-full flex-shrink-0">
                        <i className="ri-check-line text-purple-400 text-xs"></i>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="#projects" className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 whitespace-nowrap cursor-pointer">
                  View Our Websites <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>

            {/* Marketing Card */}
            <div className="observe-animation group relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] hover:border-purple-500/40 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/0 via-purple-600/0 to-violet-600/5 group-hover:from-fuchsia-600/10 group-hover:via-purple-600/5 group-hover:to-violet-600/10 transition-all duration-500"></div>
              <div className="relative p-6 sm:p-10">
                <div className="w-14 h-14 flex items-center justify-center bg-fuchsia-500/15 border border-fuchsia-500/30 rounded-2xl mb-5 sm:mb-6 group-hover:bg-fuchsia-500/25 group-hover:scale-110 transition-all duration-300">
                  <i className="ri-megaphone-line text-2xl sm:text-3xl text-fuchsia-400"></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 sm:mb-4">Marketing & Social Media</h3>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                  Grow your brand on Instagram, Facebook, and TikTok. We create content, run ads, and build engaged communities that drive real business results.
                </p>
                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                  {['Content Creation', 'Social Media Management', 'Paid Advertising', 'Analytics & Reporting'].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-white/60">
                      <span className="w-5 h-5 flex items-center justify-center bg-fuchsia-500/20 rounded-full flex-shrink-0">
                        <i className="ri-check-line text-fuchsia-400 text-xs"></i>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="#marketing" className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-fuchsia-500/30 whitespace-nowrap cursor-pointer">
                  Explore Marketing <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries we work with ── */}
      <section className="py-12 sm:py-16 lg:py-20 relative border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] to-[#0a0a0a]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,520px)] h-40 bg-purple-600/8 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-8 sm:mb-10 observe-animation">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-400/90 mb-3">Who we partner with</span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              Sectors we <span className="gradient-text">build for</span>
            </h2>
            <p className="text-white/40 text-sm sm:text-base mt-2 max-w-xl mx-auto leading-relaxed">
              We work with—and are actively building for—HVAC companies, perfume and retail brands, e‑commerce, restaurants, cafés, beauty clinics, gyms, and more.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 observe-animation">
            {[
              { icon: 'ri-windy-line', label: 'HVAC' },
              { icon: 'ri-drop-line', label: 'Perfume stores' },
              { icon: 'ri-shopping-bag-3-line', label: 'E‑commerce' },
              { icon: 'ri-restaurant-line', label: 'Restaurants' },
              { icon: 'ri-cup-line', label: 'Cafés' },
              { icon: 'ri-heart-pulse-line', label: 'Beauty clinics' },
              { icon: 'ri-run-line', label: 'Gyms' }
            ].map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/10 bg-white/[0.035] hover:border-purple-500/30 hover:bg-purple-500/[0.07] transition-all duration-300"
              >
                <i className={`${item.icon} text-purple-400 text-sm sm:text-base`}></i>
                <span className="text-xs sm:text-sm font-medium text-white/80">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects Section ── */}
      <section id="projects" className="py-16 sm:py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#0d0d0d] to-[#080808]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-purple-500/40 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-10 sm:mb-16 observe-animation">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-400 mb-4">Our Work</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Websites We Built<br />
              <span className="gradient-text">for Businesses</span>
            </h2>
            <p className="text-white/45 text-base sm:text-lg max-w-xl mx-auto">Real projects. Real results. Every site is crafted to convert visitors into loyal customers.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {projects.filter((p) => p.website).map((project, index) => (
              <div
                key={project.id}
                className="observe-animation group relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.03] hover:border-purple-500/40 hover:-translate-y-2 transition-all duration-400 hover:shadow-2xl hover:shadow-purple-500/10"
                style={{ transitionDelay: `${index * 80}ms` }}
                data-product-shop
              >
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img src={project.website!.screenshot} alt={project.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/10 transition-colors duration-300"></div>
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-white/10 text-xs text-white/70 font-medium">
                    {project.industry}
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-3">{project.name}</h3>
                  <ul className="space-y-1.5 mb-5 sm:mb-6">
                    {project.website!.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-white/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 sm:gap-3">
                    <Link to={`/case-study/${project.id}`} className={`px-3 sm:px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all text-center whitespace-nowrap ${project.website!.liveUrl ? 'flex-1' : 'w-full'}`}>
                      View Case Study
                    </Link>
                    {project.website!.liveUrl && (
                      <a href={project.website!.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 px-3 sm:px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs sm:text-sm font-medium rounded-xl border border-white/10 flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer transition-all">
                        Visit <i className="ri-external-link-line"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-12 observe-animation">
            <Link to="/projects" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 border border-white/15 hover:border-purple-500/50 text-white/70 hover:text-white text-sm font-semibold rounded-full transition-all hover:bg-purple-500/10 cursor-pointer">
              View All Projects <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section id="services" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-purple-700/8 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-10 sm:mb-16 observe-animation">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-400 mb-4">What We Offer</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">Our Services</h2>
            <p className="text-white/45 text-base sm:text-lg max-w-xl mx-auto">Everything your business needs to dominate online.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              { icon: 'ri-store-3-line', title: 'Business Websites', desc: 'Modern, fast websites for restaurants, gyms, clinics and all local businesses — built to impress and convert.', color: 'from-purple-600/20 to-violet-600/10', border: 'hover:border-purple-500/40' },
              { icon: 'ri-restaurant-line', title: 'Restaurant Menu Sites', desc: 'Beautiful digital menus optimized for mobile ordering, with WhatsApp integration and delivery info.', color: 'from-fuchsia-600/20 to-purple-600/10', border: 'hover:border-fuchsia-500/40' },
              { icon: 'ri-rocket-2-line', title: 'Landing Pages', desc: 'High-converting landing pages for promotions, services, and campaigns — designed to drive action.', color: 'from-violet-600/20 to-indigo-600/10', border: 'hover:border-violet-500/40' },
            ].map((service) => (
              <div key={service.title} className={`observe-animation group relative p-6 sm:p-8 rounded-2xl border border-white/8 bg-white/[0.02] ${service.border} hover:-translate-y-1 transition-all duration-300 overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 flex items-center justify-center bg-purple-500/15 border border-purple-500/20 rounded-2xl mb-5 sm:mb-6 group-hover:bg-purple-500/25 transition-colors">
                    <i className={`${service.icon} text-xl sm:text-2xl text-purple-400`}></i>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marketing Services Section ── */}
      <section id="marketing" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[#080808]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-fuchsia-700/8 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-10 sm:mb-16 observe-animation">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-fuchsia-400 mb-4">Marketing Services</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Grow Your Brand on<br />
              <span className="gradient-text">Social Media</span>
            </h2>
            <p className="text-white/45 text-base sm:text-lg max-w-2xl mx-auto">From content creation to paid ads, we help you build a powerful online presence that attracts and engages customers.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              { icon: 'ri-instagram-line', title: 'Social Media Management', desc: 'Daily posting, community engagement, and growth strategies for Instagram, Facebook, and TikTok.', color: 'from-fuchsia-600/20 to-pink-600/10', border: 'hover:border-fuchsia-500/40' },
              { icon: 'ri-palette-line', title: 'Content Creation', desc: 'Professional photos, videos, graphics, and captions that capture attention and drive engagement.', color: 'from-purple-600/20 to-fuchsia-600/10', border: 'hover:border-purple-500/40' },
              { icon: 'ri-advertisement-line', title: 'Paid Ads (Meta/Google)', desc: 'Targeted ad campaigns on Facebook, Instagram, and Google to reach your ideal customers.', color: 'from-violet-600/20 to-purple-600/10', border: 'hover:border-violet-500/40' },
              { icon: 'ri-line-chart-line', title: 'Brand Growth Strategy', desc: 'Data-driven strategies to increase followers, engagement, and conversions for your business.', color: 'from-indigo-600/20 to-violet-600/10', border: 'hover:border-indigo-500/40' },
            ].map((service) => (
              <div key={service.title} className={`observe-animation group relative p-6 sm:p-8 rounded-2xl border border-white/8 bg-white/[0.02] ${service.border} hover:-translate-y-1 transition-all duration-300 overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 flex items-center justify-center bg-fuchsia-500/15 border border-fuchsia-500/20 rounded-2xl mb-5 sm:mb-6 group-hover:bg-fuchsia-500/25 transition-colors">
                    <i className={`${service.icon} text-xl sm:text-2xl text-fuchsia-400`}></i>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Section ── */}
      <section className="py-16 sm:py-20 lg:py-24 relative border-y border-white/5">
        <div className="absolute inset-0 bg-[#080808]"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-10 sm:mb-12 observe-animation">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-400 mb-4">Trusted By</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">Businesses We've Worked With</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {projects.map((project) => (
              <div key={project.id} className="observe-animation group flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 cursor-default">
                <div className="w-9 h-9 flex items-center justify-center bg-purple-500/10 rounded-xl mb-2.5">
                  <i className="ri-building-line text-purple-400 text-base sm:text-lg"></i>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white/70 group-hover:text-white text-center transition-colors leading-tight">{project.name}</div>
                <div className="text-[10px] sm:text-xs text-white/30 mt-1 text-center">{project.industry}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section id="contact" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=abstract%20dark%20luxury%20background%20with%20deep%20purple%20violet%20glowing%20gradient%20light%20rays%20on%20black%20background%2C%20cinematic%20moody%20atmosphere%2C%20no%20text%2C%20minimal%2C%20elegant&width=1920&height=800&seq=contact-bg-momentum&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <div className="observe-animation">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-400 mb-5 sm:mb-6">Let's Talk</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 sm:mb-6 leading-tight">
              Ready to Grow<br />
              <span className="gradient-text">Your Business?</span>
            </h2>
            <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto">
              Whether you need a website, social media growth, or both — we're here to help your business succeed online.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-full transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-500/25 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer">
                <i className="ri-whatsapp-line text-xl"></i>
                Contact on WhatsApp
              </a>
              <a href={MAILTO_URL} className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/15 hover:border-white/30 transition-all hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer">
                <i className="ri-mail-line text-xl"></i>
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#050505] border-t border-white/5 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="https://static.readdy.ai/image/32fd8ec477f30c9eeb092abdaae5bf30/22ebaf027c8e6463c01cf57854605d6c.jpeg" alt="MomentumLB Logo" className="w-9 h-9 object-contain rounded-lg" />
                <span className="text-base font-bold text-white">MomentumLB</span>
              </div>
              <p className="text-sm text-white/35 mb-5 sm:mb-6 leading-relaxed">Building modern websites and growing brands for local businesses across Lebanon.</p>
              <div className="flex gap-3">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-purple-500/20 border border-white/8 hover:border-purple-500/40 rounded-xl transition-all cursor-pointer" aria-label="Instagram">
                  <i className="ri-instagram-line text-sm text-white/50 hover:text-purple-400"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 sm:mb-5">Quick Links</h3>
              <ul className="space-y-2.5 sm:space-y-3">
                {[{ label: 'Projects', href: '#projects' }, { label: 'Services', href: '#services' }, { label: 'Marketing', href: '#marketing' }, { label: 'Contact', href: '#contact' }].map((link) => (
                  <li key={link.label}><a href={link.href} className="text-sm text-white/35 hover:text-white transition-colors cursor-pointer">{link.label}</a></li>
                ))}
                <li><Link to="/projects" className="text-sm text-white/35 hover:text-white transition-colors">All Projects</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 sm:mb-5">Contact</h3>
              <ul className="space-y-2.5 sm:space-y-3">
                <li>
                  <a href={MAILTO_URL} className="flex items-center gap-2.5 text-sm text-white/35 hover:text-white transition-colors">
                    <i className="ri-mail-line text-purple-400 flex-shrink-0"></i>
                    {EMAIL}
                  </a>
                </li>
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-white/35 hover:text-white transition-colors">
                    <i className="ri-whatsapp-line text-purple-400 flex-shrink-0"></i>
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-white/35"><i className="ri-map-pin-line text-purple-400 flex-shrink-0"></i>Beirut, Lebanon</li>
              </ul>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-xs text-white/20">© 2025 MomentumLB. All rights reserved.</p>
            <p className="text-xs text-white/20">Crafted with precision in Lebanon 🇱🇧</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
