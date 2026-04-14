import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { EMAIL, INSTAGRAM_URL, MAILTO_URL, PHONE_DISPLAY, WHATSAPP_URL } from '../../constants/contact';
import { useMeta } from '../../hooks/useMeta';

export default function MarketingPage() {
  useMeta({
    title: 'Social Media Marketing Services in Lebanon | MomentumLB',
    description: 'MomentumLB manages Instagram, Facebook, and TikTok for local businesses in Lebanon — content creation, paid ads, and brand growth strategies that get real results.',
    canonical: 'https://momentumlb.com/marketing',
  });
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-fade-in-up');
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll('.observe-animation');
    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans overflow-x-hidden">

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/40' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="/images/momentumLOGO.jpeg"
                alt="MomentumLB Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg"
              />
              <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">MomentumLB</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Home</Link>
              <Link to="/projects" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Projects</Link>
              <Link to="/marketing" className="text-sm font-medium text-fuchsia-400">Marketing</Link>
              <a href="/#contact" className="text-sm font-medium text-white/60 hover:text-white transition-colors cursor-pointer">Contact</a>
            </div>
            <a href="/#contact" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-fuchsia-500/30 whitespace-nowrap cursor-pointer">
              Get Started <i className="ri-arrow-right-line"></i>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <i className={`text-xl ${menuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 px-4 py-4 flex flex-col gap-4">
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white/70 hover:text-white transition-colors py-2">Home</Link>
            <Link to="/projects" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white/70 hover:text-white transition-colors py-2">Projects</Link>
            <Link to="/marketing" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-fuchsia-400 py-2">Marketing</Link>
            <a href="/#contact" onClick={() => setMenuOpen(false)} className="mt-2 px-5 py-3 bg-fuchsia-600 text-white text-sm font-semibold rounded-full text-center whitespace-nowrap cursor-pointer">Get Started</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#080808]"></div>
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=abstract%20dark%20luxury%20digital%20background%20with%20vibrant%20fuchsia%20pink%20purple%20gradient%20glowing%20particles%20on%20black%20background%2C%20social%20media%20marketing%20theme%2C%20cinematic%20moody%20atmosphere%2C%20ultra%20high%20quality%2C%20no%20text%2C%20minimal%20elegant&width=1920&height=1080&seq=marketing-hero-bg&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/60"></div>
        </div>
        <div className="absolute top-1/3 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-pink-500/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-24 sm:pt-32 pb-16 sm:pb-20 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 mb-6 sm:mb-8 animate-slide-left">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse flex-shrink-0"></span>
              <span className="text-[10px] sm:text-xs font-semibold text-fuchsia-300 tracking-widest uppercase">Social Media Marketing · Lebanon</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-5 sm:mb-6 animate-slide-left" style={{ animationDelay: '0.1s' }}>
              Grow Your Brand on<br />
              <span className="gradient-text">Social Media</span>
            </h1>
            <p className="text-base sm:text-lg text-white/55 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto animate-slide-left" style={{ animationDelay: '0.2s' }}>
              We create engaging content, manage your social media presence, and run targeted ads to help restaurants, clinics, gyms, and local businesses attract more customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-slide-left" style={{ animationDelay: '0.3s' }}>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-full transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-500/25 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-whatsapp-line text-xl"></i>
                Contact on WhatsApp
              </a>
              <a
                href="mailto:hello@momentumlb.com"
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/15 hover:border-white/30 transition-all hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-mail-line text-xl"></i>
                Send Email
              </a>
            </div>
            <div className="flex gap-6 sm:gap-10 justify-center mt-10 sm:mt-14 animate-slide-left" style={{ animationDelay: '0.4s' }}>
              {[['50K+', 'Followers Grown'], ['300%', 'Avg. Engagement Boost'], ['15+', 'Brands Managed']].map(([num, label]) => (
                <div key={label} className="text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-white">{num}</div>
                  <div className="text-[10px] sm:text-xs text-white/40 mt-0.5 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase text-white/50">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#0d0d0d] to-[#080808]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-fuchsia-700/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-10 sm:mb-16 observe-animation">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-fuchsia-400 mb-4">What We Offer</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Complete Social Media<br />
              <span className="gradient-text">Marketing Solutions</span>
            </h2>
            <p className="text-white/45 text-base sm:text-lg max-w-2xl mx-auto">From content creation to paid advertising, we handle everything to grow your brand online.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              { icon: 'ri-instagram-line', title: 'Social Media Management', desc: 'Daily posting, community engagement, and growth strategies for Instagram, Facebook, and TikTok.', features: ['Daily Content Posting', 'Community Management', 'Growth Strategy', 'Platform Optimization'], color: 'from-fuchsia-600/20 to-pink-600/10', border: 'hover:border-fuchsia-500/40' },
              { icon: 'ri-palette-line', title: 'Content Creation & Design', desc: 'Professional photos, videos, graphics, and captions that capture attention and drive engagement.', features: ['Professional Photography', 'Video Production', 'Graphic Design', 'Copywriting'], color: 'from-purple-600/20 to-fuchsia-600/10', border: 'hover:border-purple-500/40' },
              { icon: 'ri-advertisement-line', title: 'Paid Advertising', desc: 'Targeted ad campaigns on Facebook, Instagram, and Google to reach your ideal customers.', features: ['Meta Ads (FB/IG)', 'Google Ads', 'Audience Targeting', 'A/B Testing'], color: 'from-violet-600/20 to-purple-600/10', border: 'hover:border-violet-500/40' },
              { icon: 'ri-line-chart-line', title: 'Analytics & Reporting', desc: 'Detailed monthly reports showing follower growth, engagement rates, reach, and ROI.', features: ['Performance Tracking', 'Monthly Reports', 'Competitor Analysis', 'ROI Measurement'], color: 'from-indigo-600/20 to-violet-600/10', border: 'hover:border-indigo-500/40' },
              { icon: 'ri-lightbulb-line', title: 'Brand Strategy', desc: 'Develop a cohesive brand identity and messaging strategy that resonates with your target audience.', features: ['Brand Positioning', 'Content Strategy', 'Audience Research', 'Competitor Analysis'], color: 'from-pink-600/20 to-fuchsia-600/10', border: 'hover:border-pink-500/40' },
              { icon: 'ri-user-star-line', title: 'Influencer Partnerships', desc: 'Connect with local influencers and content creators to amplify your brand reach.', features: ['Influencer Outreach', 'Campaign Management', 'Content Collaboration', 'Performance Tracking'], color: 'from-rose-600/20 to-pink-600/10', border: 'hover:border-rose-500/40' },
            ].map((service) => (
              <div key={service.title} className={`observe-animation group relative p-6 sm:p-8 rounded-2xl border border-white/8 bg-white/[0.02] ${service.border} hover:-translate-y-1 transition-all duration-300 overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 flex items-center justify-center bg-fuchsia-500/15 border border-fuchsia-500/20 rounded-2xl mb-5 sm:mb-6 group-hover:bg-fuchsia-500/25 transition-colors">
                    <i className={`${service.icon} text-xl sm:text-2xl text-fuchsia-400`}></i>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4 sm:mb-6">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-white/40">
                        <span className="w-1 h-1 rounded-full bg-fuchsia-400 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[#080808]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-fuchsia-700/8 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-10 sm:mb-16 observe-animation">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-fuchsia-400 mb-4">Real Results</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Results We've<br />
              <span className="gradient-text">Delivered</span>
            </h2>
            <p className="text-white/45 text-base sm:text-lg max-w-2xl mx-auto">Data-driven marketing that delivers measurable growth for local businesses.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: 'ri-user-add-line', metric: '+50K', label: 'Total Followers Grown', desc: 'Across all client accounts', color: 'from-fuchsia-600/20 to-pink-600/10', iconBg: 'bg-fuchsia-500/15', iconColor: 'text-fuchsia-400' },
              { icon: 'ri-heart-line', metric: '300%', label: 'Avg. Engagement Increase', desc: 'Within first 3 months', color: 'from-pink-600/20 to-rose-600/10', iconBg: 'bg-pink-500/15', iconColor: 'text-pink-400' },
              { icon: 'ri-eye-line', metric: '2M+', label: 'Monthly Reach', desc: 'Combined across platforms', color: 'from-purple-600/20 to-fuchsia-600/10', iconBg: 'bg-purple-500/15', iconColor: 'text-purple-400' },
              { icon: 'ri-money-dollar-circle-line', metric: '450%', label: 'Average ROI', desc: 'On paid ad campaigns', color: 'from-violet-600/20 to-purple-600/10', iconBg: 'bg-violet-500/15', iconColor: 'text-violet-400' },
            ].map((stat) => (
              <div key={stat.label} className="observe-animation group relative p-5 sm:p-8 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-fuchsia-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className={`w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center ${stat.iconBg} border border-fuchsia-500/20 rounded-xl mb-4 sm:mb-6`}>
                    <i className={`${stat.icon} text-lg sm:text-xl ${stat.iconColor}`}></i>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1 sm:mb-2">{stat.metric}</div>
                  <div className="text-xs sm:text-sm font-semibold text-white/70 mb-1">{stat.label}</div>
                  <div className="text-[10px] sm:text-xs text-white/40">{stat.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#0d0d0d] to-[#080808]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-fuchsia-700/8 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-10 sm:mb-16 observe-animation">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-fuchsia-400 mb-4">How We Work</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-white/45 text-base sm:text-lg max-w-2xl mx-auto">A proven step-by-step approach to growing your brand on social media.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {[
              { step: '01', icon: 'ri-search-line', title: 'Audit', desc: 'We analyze your current social media presence, competitors, and target audience.' },
              { step: '02', icon: 'ri-lightbulb-line', title: 'Strategy', desc: 'We develop a custom content and growth strategy tailored to your business goals.' },
              { step: '03', icon: 'ri-palette-line', title: 'Content', desc: 'We create high-quality photos, videos, graphics, and captions for your brand.' },
              { step: '04', icon: 'ri-rocket-line', title: 'Publish', desc: 'We post consistently, engage with your community, and run targeted ad campaigns.' },
              { step: '05', icon: 'ri-bar-chart-line', title: 'Analyze', desc: 'We track performance, optimize campaigns, and provide detailed monthly reports.' },
            ].map((process, index) => (
              <div
                key={process.step}
                className="observe-animation group relative p-5 sm:p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-fuchsia-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden col-span-1"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/0 via-fuchsia-600/0 to-fuchsia-600/5 group-hover:from-fuchsia-600/10 group-hover:via-fuchsia-600/5 group-hover:to-fuchsia-600/10 transition-all duration-500"></div>
                <div className="relative">
                  <div className="text-xs font-bold text-fuchsia-400/40 mb-3 sm:mb-4">{process.step}</div>
                  <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-fuchsia-500/15 border border-fuchsia-500/20 rounded-xl mb-3 sm:mb-4 group-hover:bg-fuchsia-500/25 transition-colors">
                    <i className={`${process.icon} text-lg sm:text-xl text-fuchsia-400`}></i>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">{process.title}</h3>
                  <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{process.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[#080808]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-fuchsia-700/8 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-10 sm:mb-16 observe-animation">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-fuchsia-400 mb-4">Client Success</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              What Our Clients<br />
              <span className="gradient-text">Are Saying</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              { name: 'Sarah M.', business: 'Bella Cucina Restaurant', avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20middle%20eastern%20woman%20restaurant%20owner%20smiling%20confident%20on%20simple%20light%20background%2C%20high%20quality%2C%20realistic%2C%20no%20text&width=200&height=200&seq=testimonial-sarah&orientation=squarish', quote: 'MomentumLB transformed our Instagram presence. We went from 500 followers to 8,000 in just 4 months, and our reservations increased by 60%!', rating: 5 },
              { name: 'Dr. Ahmad K.', business: 'Dental Smile Clinic', avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20middle%20eastern%20male%20dentist%20doctor%20smiling%20confident%20on%20simple%20light%20background%2C%20high%20quality%2C%20realistic%2C%20no%20text&width=200&height=200&seq=testimonial-ahmad&orientation=squarish', quote: 'Their content creation and ad campaigns brought us 40+ new patients in the first month. The ROI has been incredible. Highly recommend!', rating: 5 },
              { name: 'Maya R.', business: 'FitZone Gym', avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20middle%20eastern%20woman%20fitness%20gym%20owner%20smiling%20confident%20on%20simple%20light%20background%2C%20high%20quality%2C%20realistic%2C%20no%20text&width=200&height=200&seq=testimonial-maya&orientation=squarish', quote: 'Professional, creative, and results-driven. They manage our social media completely and our membership sign-ups have tripled. Best decision we made!', rating: 5 },
            ].map((testimonial) => (
              <div key={testimonial.name} className="observe-animation group relative p-6 sm:p-8 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-fuchsia-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/0 via-fuchsia-600/0 to-fuchsia-600/5 group-hover:from-fuchsia-600/10 group-hover:via-fuchsia-600/5 group-hover:to-fuchsia-600/10 transition-all duration-500"></div>
                <div className="relative">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                    ))}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-5 sm:mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full overflow-hidden border-2 border-fuchsia-500/30 flex-shrink-0">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{testimonial.name}</div>
                      <div className="text-xs text-white/40">{testimonial.business}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=abstract%20dark%20luxury%20background%20with%20vibrant%20fuchsia%20pink%20purple%20glowing%20gradient%20light%20rays%20on%20black%20background%2C%20cinematic%20moody%20atmosphere%2C%20no%20text%2C%20minimal%2C%20elegant&width=1920&height=800&seq=marketing-cta-bg&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-fuchsia-600/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <div className="observe-animation">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-fuchsia-400 mb-5 sm:mb-6">Let's Grow Together</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 sm:mb-6 leading-tight">
              Ready to Grow Your<br />
              <span className="gradient-text">Social Media Presence?</span>
            </h2>
            <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto">
              Let's build a powerful social media strategy that attracts customers, builds community, and drives real business growth.
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

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/momentumLOGO.jpeg" alt="MomentumLB Logo" className="w-9 h-9 object-contain rounded-lg" />
                <span className="text-base font-bold text-white">MomentumLB</span>
              </div>
              <p className="text-sm text-white/35 mb-5 sm:mb-6 leading-relaxed">Building modern websites and growing brands for local businesses across Lebanon.</p>
              <div className="flex gap-3">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-fuchsia-500/20 border border-white/8 hover:border-fuchsia-500/40 rounded-xl transition-all cursor-pointer" aria-label="Instagram">
                  <i className="ri-instagram-line text-sm text-white/50 hover:text-fuchsia-400"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 sm:mb-5">Quick Links</h3>
              <ul className="space-y-2.5 sm:space-y-3">
                {[{ label: 'Home', to: '/' }, { label: 'Projects', to: '/projects' }, { label: 'Marketing', to: '/marketing' }].map((link) => (
                  <li key={link.label}><Link to={link.to} className="text-sm text-white/35 hover:text-white transition-colors">{link.label}</Link></li>
                ))}
                <li><a href="/#contact" className="text-sm text-white/35 hover:text-white transition-colors cursor-pointer">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 sm:mb-5">Contact</h3>
              <ul className="space-y-2.5 sm:space-y-3">
                <li>
                  <a href={MAILTO_URL} className="flex items-center gap-2.5 text-sm text-white/35 hover:text-white transition-colors">
                    <i className="ri-mail-line text-fuchsia-400 flex-shrink-0"></i>
                    {EMAIL}
                  </a>
                </li>
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-white/35 hover:text-white transition-colors">
                    <i className="ri-whatsapp-line text-fuchsia-400 flex-shrink-0"></i>
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-white/35"><i className="ri-map-pin-line text-fuchsia-400 flex-shrink-0"></i>Beirut, Lebanon</li>
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
