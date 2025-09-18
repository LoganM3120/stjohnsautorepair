import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer__content">
        <div className="footer__brand">
          St. John&apos;s Auto Repair
          <p className="helper-text" style={{ color: '#cbd5f5', marginTop: '0.5rem' }}>
            Keeping Jacksonville drivers safely on the road.
          </p>
        </div>
        <div className="footer__links">
          <Link to="/">Home</Link>
          <Link to="/request-quote">Request a Quote</Link>
          <a href="tel:+19045551234">Call (904) 555-1234</a>
          <a href="mailto:service@stjohnsautorepair.com">service@stjohnsautorepair.com</a>
        </div>
        <p className="footer__note">&copy; {new Date().getFullYear()} St. John&apos;s Auto Repair. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
