import { Link } from 'react-router-dom';
import { projects } from '../../mocks/projects';
import { useEffect, useRef, useState } from 'react';
import { MAILTO_URL, WHATSAPP_URL } from '../../constants/contact';

export default function ProjectsPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'website' | 'marketing'>('all');
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
  }, [activeFilter]);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'website') return !!project.website;
    return !!project.marketing;
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/40' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="https://static.readdy.ai/image/32fd8ec477f30c9eeb092abdaae5bf30/22ebaf027c8e6463c01cf57854605d6c.jpeg"
                alt="MomentumLB"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg"
              />
              <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">MomentumLB</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Home</Link>
              <Link to="/projects" className="text-sm font-medium text-purple-400">Projects</Link>
              <a href="/#services" className="text-sm font-medium text-white/60 hover:text-white transition-colors cursor-pointer">Services</a>
              <a href="/#contact" className="text-sm font-medium text-white/60 hover:text-white transition-colors cursor-pointer">Contact</a>
            </div>
            <a href="/#contact" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 whitespace-nowrap cursor-pointer">
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
            <Link to="/projects" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-purple-400 py-2">Projects</Link>
            <a href="/#services" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white/70 hover:text-white transition-colors py-2 cursor-pointer">Services</a>
            <a href="/#contact" onClick={() => setMenuOpen(false)} className="mt-2 px-5 py-3 bg-purple-600 text-white text-sm font-semibold rounded-full text-center whitespace-nowrap cursor-pointer">Get Started</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-32 sm:pt-40 pb-12 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#080808]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] bg-purple-700/12 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <div className="observe-animation">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-400 mb-4 sm:mb-5">Portfolio</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-5">
              All <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-base sm:text-lg text-white/45 max-w-xl mx-auto">
              Explore the websites we've built and brands we've grown for local businesses across Lebanon.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {(['all', 'website', 'marketing'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {filter === 'all' ? 'All Projects' : filter === 'website' ? 'Websites' : 'Marketing'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredProjects.map((project, index) => {
              const showWebsite = activeFilter === 'website' || (activeFilter === 'all' && project.website);
              const showMarketing = activeFilter === 'marketing' || (activeFilter === 'all' && project.marketing && !project.website);
              const screenshot = activeFilter === 'website' && project.website
                ? project.website.screenshot
                : activeFilter === 'marketing' && project.marketing
                  ? project.marketing.screenshot
                  : (project.website ?? project.marketing)!.screenshot;
              const isWebsiteCard = !!project.website && (activeFilter === 'all' || activeFilter === 'website');

              return (
                <div
                  key={project.id}
                  className="observe-animation group relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.03] hover:border-purple-500/40 hover:-translate-y-2 transition-all duration-400 hover:shadow-2xl hover:shadow-purple-500/10"
                  style={{ transitionDelay: `${index * 80}ms` }}
                  data-product-shop
                >
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={screenshot}
                      alt={project.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/10 transition-colors duration-300"></div>
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-white/10 text-xs text-white/70 font-medium">
                      {project.industry}
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-white/10 text-xs text-white/50 flex items-center gap-1">
                      <i className="ri-map-pin-line text-purple-400 text-xs"></i>
                      <span className="hidden sm:inline">{project.location}</span>
                    </div>
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                      {project.website && (activeFilter === 'all' || activeFilter === 'website') && (
                        <span className="px-2 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full border border-purple-400/30 text-[10px] sm:text-xs text-white font-semibold flex items-center gap-1">
                          <i className="ri-window-line"></i>
                          Website
                        </span>
                      )}
                      {project.marketing && (activeFilter === 'all' || activeFilter === 'marketing') && (
                        <span className="px-2 py-1 bg-fuchsia-600/80 backdrop-blur-sm rounded-full border border-fuchsia-400/30 text-[10px] sm:text-xs text-white font-semibold flex items-center gap-1">
                          <i className="ri-line-chart-line"></i>
                          Marketing
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-3">{project.name}</h3>

                    {showWebsite && project.website ? (
                      <ul className="space-y-1.5 mb-5 sm:mb-6">
                        {project.website.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-white/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    ) : showMarketing && project.marketing ? (
                      <>
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                          <i className="ri-instagram-line text-fuchsia-400 text-base sm:text-lg"></i>
                          <span className="text-xs sm:text-sm text-white/60">{project.marketing.platform}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5 sm:mb-6">
                          <div className="text-center">
                            <div className="text-base sm:text-lg font-bold text-fuchsia-400">{project.marketing.metrics.followersGrowth}</div>
                            <div className="text-[10px] sm:text-xs text-white/40">Followers</div>
                          </div>
                          <div className="text-center">
                            <div className="text-base sm:text-lg font-bold text-fuchsia-400">{project.marketing.metrics.engagementRate}</div>
                            <div className="text-[10px] sm:text-xs text-white/40">Engagement</div>
                          </div>
                          <div className="text-center">
                            <div className="text-base sm:text-lg font-bold text-fuchsia-400">{project.marketing.metrics.monthlyReach}</div>
                            <div className="text-[10px] sm:text-xs text-white/40">Reach</div>
                          </div>
                        </div>
                      </>
                    ) : null}

                    <div className="flex gap-2 sm:gap-3">
                      <Link
                        to={`/case-study/${project.id}`}
                        className={`px-3 sm:px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all text-center whitespace-nowrap ${project.website && isWebsiteCard && project.website.liveUrl ? 'flex-1' : 'w-full'}`}
                      >
                        View Case Study
                      </Link>
                      {project.website && isWebsiteCard && project.website.liveUrl && (
                        <a
                          href={project.website.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 sm:px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs sm:text-sm font-medium rounded-xl border border-white/10 flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all"
                        >
                          Visit <i className="ri-external-link-line"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-600/12 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-16 text-center observe-animation">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-5">
            Ready to Start<br /><span className="gradient-text">Your Project?</span>
          </h2>
          <p className="text-base sm:text-lg text-white/45 mb-8 sm:mb-10">Let's build a website or grow your brand on social media.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-full transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-500/25 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-whatsapp-line text-xl"></i>
              Contact on WhatsApp
            </a>
            <a
              href={MAILTO_URL}
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/15 hover:border-white/30 transition-all hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-mail-line text-xl"></i>
              Send Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img src="https://static.readdy.ai/image/32fd8ec477f30c9eeb092abdaae5bf30/22ebaf027c8e6463c01cf57854605d6c.jpeg" alt="MomentumLB" className="w-8 h-8 object-contain rounded-lg" />
              <span className="text-sm font-bold text-white">MomentumLB</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link to="/" className="text-sm text-white/35 hover:text-white transition-colors">Home</Link>
              <Link to="/projects" className="text-sm text-white/35 hover:text-white transition-colors">Projects</Link>
              <a href="/#services" className="text-sm text-white/35 hover:text-white transition-colors cursor-pointer">Services</a>
              <a href="/#contact" className="text-sm text-white/35 hover:text-white transition-colors cursor-pointer">Contact</a>
            </div>
            <p className="text-xs text-white/20">© 2025 MomentumLB. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
