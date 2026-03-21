import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t border-border bg-card/50">
    <div className="container mx-auto px-4 md:px-8 py-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg gradient-gold flex items-center justify-center font-display font-bold text-sm text-primary-foreground">V</div>
            <span className="font-display font-bold text-foreground">Vedant Capital Service</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">Your trusted partner in financial recovery and investment solutions since 2008.</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {['Home', 'About', 'Services', 'Contact'].map(l => (
              <a key={l} href={`/#${l.toLowerCase()}`} className="text-xs text-muted-foreground hover:text-primary transition-colors">{l}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-3">Services</h4>
          <div className="flex flex-col gap-2">
            {['Recovery of Shares', 'Duplicate Shares', 'Unclaimed PF', 'Unclaimed MF'].map(s => (
              <span key={s} className="text-xs text-muted-foreground">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-3">Contact</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>+91 9956304400</p>
            <p>info@vedantcapitalservices.in</p>
            <p>Lucknow, Uttar Pradesh</p>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Vedant Capital Service. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
