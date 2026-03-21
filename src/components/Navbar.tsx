import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Contact', href: '/#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-strong shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center font-display font-bold text-lg text-primary-foreground">
            V
          </div>
          <span className="font-display font-bold text-lg text-foreground hidden sm:block">
            Vedant Capital <span className="text-gradient-gold">Service</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              onClick={() => handleNavClick(l.href)}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 rounded-lg hover:bg-muted/50"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/login" className="ml-2 px-5 py-2 text-sm font-semibold btn-3d rounded-lg">
            Admin Login
          </Link>
        </div>

        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass-strong border-t border-border animate-fade-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                onClick={() => handleNavClick(l.href)}
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary rounded-lg hover:bg-muted/50 transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="px-4 py-3 text-sm font-semibold btn-3d rounded-lg text-center mt-2">
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
