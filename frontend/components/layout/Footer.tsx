const Footer = () => {
  return (
    <footer className="layout-footer">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-primary-text/60">
          © 2026 MediaHub. Alle Rechte vorbehalten.
        </div>
        <div className="flex gap-8 text-sm text-primary-text/60">
          <a href="#" className="hover:text-primary-accent transition-colors">Datenschutz</a>
          <a href="#" className="hover:text-primary-accent transition-colors">Nutzungsbedingungen</a>
          <a href="#" className="hover:text-primary-accent transition-colors">Kontakt</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
