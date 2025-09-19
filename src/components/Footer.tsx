import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__content">
        <div className="footer__brand">
          St. John’s Auto Repair
          <p className="helper-text" style={{ color: "#cbd5f5", marginTop: "0.5rem" }}>
            Keeping Jacksonville drivers safely on the road.
          </p>
        </div>
        <div className="footer__links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <a href="tel:+19048273869">Call +1 (904) 827-3869</a>
          <a href="mailto:saintjohnsautorepair@gmail.com">
            saintjohnsautorepair@gmail.com
          </a>
        </div>
        <p className="footer__note">
          &copy; {new Date().getFullYear()} St. John’s Auto Repair. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
