const Footer = () => {
  return (
    <footer className="layout-footer">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-primary-text/60">
          © 2026 MYLIGHTS - Matteo Bosshard. All rights reserved.
        </div>
        <div className="flex gap-8 text-sm text-primary-text/60">
          <a href="#" className="hover:text-primary-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary-accent transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary-accent transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
