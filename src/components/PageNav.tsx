import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Page = 'projects' | 'services' | 'marketing' | 'contact';

const NAV_LINKS = [
  { label: 'Home',      to: '/'          },
  { label: 'Projects',  to: '/projects'  },
  { label: 'Services',  to: '/services'  },
  { label: 'Marketing', to: '/marketing' },
  { label: 'Contact',   to: '/contact'   },
] as const;

export function PageNav({ current }: { current: Page }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const active = `/${current}`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/40' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src="/images/momentumLOGO.jpeg" alt="MomentumLB" className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg" />
            <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">MomentumLB</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  link.to === active ? 'text-purple-400' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA — hidden on contact since user is already there */}
          {current !== 'contact' && (
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 whitespace-nowrap"
            >
              Get Started <i className="ri-arrow-right-line" />
            </Link>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <i className={`text-xl ${menuOpen ? 'ri-close-line' : 'ri-menu-line'}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium py-3 px-2 rounded-lg transition-colors ${
                link.to === active
                  ? 'text-purple-400 bg-purple-500/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {current !== 'contact' && (
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-3 px-5 py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-full text-center transition-colors"
            >
              Get Started
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
