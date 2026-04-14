import { Link, useParams } from 'react-router-dom';
import { projects } from '../../mocks/projects';
import { useEffect, useRef, useState } from 'react';
import { MAILTO_URL, WHATSAPP_URL } from '../../constants/contact';
import { useMeta } from '../../hooks/useMeta';

export default function CaseStudyPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  useMeta({
    title: project
      ? `${project.name} – Case Study | MomentumLB`
      : 'Case Study | MomentumLB',
    description: project
      ? `See how MomentumLB helped ${project.name} (${project.industry}) grow online in Lebanon. Before: ${project.before} After: ${project.after}`
      : 'Explore how MomentumLB helps local businesses in Lebanon grow online.',
    canonical: `https://momentumlb.com/case-study/${id ?? ''}`,
    ogImage: project?.website?.screenshot
      ? `https://momentumlb.com${project.website.screenshot}`
      : undefined,
  });
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('animate-fade-in-up'); }); },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll('.observe-animation');
    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-purple-400 hover:underline">Back to Projects</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/40' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img src="/images/momentumLOGO.jpeg" className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg" />
              <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">MomentumLB</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Home</Link>
              <Link to="/projects" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Projects</Link>
              <a href="/#services" className="text-sm font-medium text-white/60 hover:text-white transition-colors cursor-pointer">Services</a>
              <a href="/#contact" className="text-sm font-medium text-white/60 hover:text-white transition-colors cursor-pointer">Contact</a>
            </div>
            <a href="/#contact" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 whitespace-nowrap cursor-pointer">
              Get Started <i className="ri-arrow-right-line"></i>
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors">
              <i className={`text-xl ${menuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 px-4 py-4 flex flex-col gap-4">
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white/70 hover:text-white transition-colors py-2">Home</Link>
            <Link to="/projects" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white/70 hover:text-white transition-colors py-2">Projects</Link>
            <a href="/#services" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white/70 hover:text-white transition-colors py-2 cursor-pointer">Services</a>
            <a href="/#contact" onClick={() => setMenuOpen(false)} className="mt-2 px-5 py-3 bg-purple-600 text-white text-sm font-semibold rounded-full text-center whitespace-nowrap cursor-pointer">Get Started</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-24 sm:pt-36 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#080808]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[700px] h-[300px] sm:h-[400px] bg-purple-700/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-8 sm:mb-12 observe-animation">
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-purple-400 transition-colors mb-5 sm:mb-6">
              <i className="ri-arrow-left-line"></i>
              Back to Projects
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4">
              <span className="px-3 py-1 bg-purple-500/15 border border-purple-500/25 rounded-full text-xs font-semibold text-purple-300 uppercase tracking-wider">
                {project.industry}
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/40 flex items-center gap-1">
                <i className="ri-map-pin-line text-purple-400"></i>
                {project.location}
              </span>
              {project.website && project.marketing && (
                <span className="px-3 py-1 bg-fuchsia-500/15 border border-fuchsia-500/25 rounded-full text-xs font-semibold text-fuchsia-300 flex items-center gap-1.5">
                  <i className="ri-window-line"></i>
                  <i className="ri-megaphone-line"></i>
                  Website + Marketing
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white mb-3 sm:mb-4">{project.name}</h1>
            <p className="text-white/40 text-base sm:text-lg">Case Study</p>
          </div>

          {/* Hero preview: laptop mockup for website, image for marketing-only */}
          {project.website ? (
            <div className="observe-animation relative max-w-4xl mx-auto">
              <div className="absolute -inset-4 sm:-inset-8 bg-purple-600/10 rounded-3xl blur-3xl"></div>
              <div className="relative animate-pulse-glow rounded-2xl">
                <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl p-2 sm:p-3 shadow-2xl border border-white/10">
                  <div className="bg-zinc-900 rounded-t-xl px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 border-b border-white/5">
                    <div className="flex gap-1 sm:gap-1.5 flex-shrink-0">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="flex-1 bg-zinc-800 rounded-md px-2 sm:px-3 py-1 sm:py-1.5 text-xs text-zinc-500 ml-1 sm:ml-2 flex items-center gap-1.5 min-w-0">
                      <i className={`${project.website.liveUrl ? 'ri-lock-line text-green-400' : 'ri-eye-line text-amber-400/90'} text-xs flex-shrink-0`}></i>
                      <span className="truncate">{project.website.liveUrl ?? 'Design preview · not published yet'}</span>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-b-xl">
                    <img src={project.website.screenshot} alt={project.name} className="w-full h-auto object-cover object-top" />
                  </div>
                </div>
              </div>
            </div>
          ) : project.marketing ? (
            <div className="observe-animation relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10">
              <img src={project.marketing.screenshot} alt={project.name} className="w-full h-auto object-cover object-top" />
            </div>
          ) : null}

          {/* Meta bar */}
          <div className="observe-animation mt-6 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Client', value: project.name },
              { label: 'Industry', value: project.industry },
              { label: 'Location', value: project.location },
            ].map(({ label, value }) => (
              <div key={label} className="text-center p-3 sm:p-4 rounded-2xl border border-white/8 bg-white/[0.02]">
                <div className="text-xs uppercase tracking-wider text-white/30 mb-1 sm:mb-1.5">{label}</div>
                <div className="text-xs sm:text-sm font-semibold text-white leading-tight">{value}</div>
              </div>
            ))}
            {project.website && (
              <div className="col-span-2 sm:col-span-1 text-center p-3 sm:p-4 rounded-2xl border border-purple-500/25 bg-purple-500/8 flex items-center justify-center">
                {project.website.liveUrl ? (
                  <a href={project.website.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold rounded-full transition-all hover:scale-105 whitespace-nowrap cursor-pointer">
                    Visit Live Site <i className="ri-external-link-line"></i>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-white/5 text-white/55 text-xs sm:text-sm font-medium rounded-full border border-white/10 whitespace-nowrap">
                    <i className="ri-time-line text-amber-400/90"></i>
                    Live link coming soon
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content: unified when both website + marketing, otherwise single block */}
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 space-y-5 sm:space-y-8">

          {/* Before / After - all projects */}
          <div className="observe-animation grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02] p-5 sm:p-6 border-l-4 border-l-red-500/50">
              <div className="text-xs font-semibold text-red-400/90 uppercase tracking-wider mb-2">Before</div>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">{project.before}</p>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02] p-5 sm:p-6 border-l-4 border-l-green-500/50">
              <div className="text-xs font-semibold text-green-400/90 uppercase tracking-wider mb-2">After</div>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">{project.after}</p>
            </div>
          </div>

          {project.website && project.marketing ? (
            /* Unified: Key Features + Gallery */
            <>
              <div className="observe-animation">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6">Key Features</h2>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {[...(project.website.keyFeatures ?? []), ...(project.marketing.keyFeatures ?? [])].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300">
                      <div className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center bg-purple-500/15 border border-purple-500/20 rounded-lg flex-shrink-0 mt-0.5">
                        <i className="ri-check-line text-purple-400 text-xs sm:text-sm"></i>
                      </div>
                      <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="observe-animation">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6">Gallery</h2>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  {[...(project.website.gallery ?? []), ...(project.marketing.gallery ?? [])].map((image, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-2xl border border-white/8 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                      <img src={image} alt={`${project.name} ${index + 1}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : project.website ? (
            /* Website only */
            <>
              <div className="observe-animation">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6">Key Features</h2>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {project.website.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300">
                      <div className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center bg-purple-500/15 border border-purple-500/20 rounded-lg flex-shrink-0 mt-0.5">
                        <i className="ri-check-line text-purple-400 text-xs sm:text-sm"></i>
                      </div>
                      <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="observe-animation">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6">Screenshots</h2>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  {project.website.gallery.map((image, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-2xl border border-white/8 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                      <img src={image} alt={`${project.name} screenshot ${index + 1}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : project.marketing ? (
            /* Marketing only */
            <>
              <div className="observe-animation">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6">Key Features</h2>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {project.marketing.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-fuchsia-500/30 hover:bg-fuchsia-500/5 transition-all duration-300">
                      <div className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center bg-fuchsia-500/15 border border-fuchsia-500/20 rounded-lg flex-shrink-0 mt-0.5">
                        <i className="ri-check-line text-fuchsia-400 text-xs sm:text-sm"></i>
                      </div>
                      <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="observe-animation">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6">Gallery</h2>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  {project.marketing.gallery.map((image, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-2xl border border-white/8 hover:border-fuchsia-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-fuchsia-500/10">
                      <img src={image} alt={`${project.name} ${index + 1}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-600/12 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-16 text-center observe-animation">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-5">
            Want Similar Results<br /><span className="gradient-text">for Your Business?</span>
          </h2>
          <p className="text-base sm:text-lg text-white/45 mb-8 sm:mb-10">Let's discuss how we can help your business grow with a modern website.</p>
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
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img src="/images/momentumLOGO.jpeg" alt="MomentumLB" className="w-8 h-8 object-contain rounded-lg" />
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
