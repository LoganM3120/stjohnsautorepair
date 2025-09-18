import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <section className="section" style={{ paddingTop: '5rem' }}>
        <div className="container" style={{ display: 'grid', gap: '2.5rem' }}>
          <div className="stack">
            <span className="badge">Mobile Auto Care · Jacksonville &amp; St. Johns County</span>
            <h1 className="section__title" style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}>
              Reliable auto repairs that come to you, wherever the road takes you.
            </h1>
            <p className="section__subtitle" style={{ fontSize: '1.1rem' }}>
              ASE-certified mechanic providing diagnostics, repairs, and preventative maintenance at your home or workplace.
              Fast response times, transparent pricing, and guaranteed workmanship.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to="/request-quote" className="button">
                Request a Quote
              </Link>
              <a
                className="button"
                href="tel:+19045551234"
                style={{
                  background: 'transparent',
                  color: 'var(--accent)',
                  boxShadow: 'inset 0 0 0 2px var(--accent)'
                }}
              >
                Call (904) 555-1234
              </a>
            </div>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span
                  style={{
                    width: '0.75rem',
                    height: '0.75rem',
                    borderRadius: '9999px',
                    background: 'var(--accent)',
                    boxShadow: '0 0 0 2px rgba(243, 156, 18, 0.25)'
                  }}
                />
                <p className="helper-text">Same-day appointments often available</p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span
                  style={{
                    width: '0.75rem',
                    height: '0.75rem',
                    borderRadius: '9999px',
                    background: 'var(--secondary)',
                    boxShadow: '0 0 0 2px rgba(236, 240, 241, 0.2)'
                  }}
                />
                <p className="helper-text">Serving Jacksonville, St. Augustine, Ponte Vedra, and surrounding areas</p>
              </div>
            </div>
          </div>

          <div
            className="card"
            style={{
              background: 'linear-gradient(160deg, rgba(84, 84, 84, 0.65), rgba(44, 62, 80, 0.95))',
              color: 'var(--text)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Roadside-ready service</h2>
              <p style={{ color: 'rgba(236, 240, 241, 0.8)' }}>
                Whether you&apos;re at home, at work, or stranded in a parking lot, St. John&apos;s Auto Repair brings the shop to you with
                fully equipped mobile diagnostics and repair tools.
              </p>
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {["Advanced diagnostics", "Preventative maintenance", "Electrical &amp; mechanical repairs", "Fleet service partnerships"].map((item) => (
                <div key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.75rem', background: 'rgba(236, 240, 241, 0.08)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ width: '0.65rem', height: '0.65rem', borderRadius: '50%', background: 'var(--accent)' }} />
                  </span>
                  <p style={{ fontWeight: 600 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="stack" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="badge" style={{ background: 'rgba(243, 156, 18, 0.2)', color: 'var(--accent)' }}>What we do</span>
            <h2 className="section__title">Full-service mobile mechanic</h2>
            <p className="section__subtitle" style={{ color: 'rgba(248, 249, 250, 0.8)' }}>
              From diagnostics to complex repairs, we deliver dealership-level expertise with the personal touch of a local mechanic.
            </p>
          </div>

          <div className="grid grid--two">
            {serviceHighlights.map((service) => (
              <article key={service.title} className="card" style={{ background: 'rgba(44, 62, 80, 0.85)', color: 'var(--text)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <span
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '1rem',
                      background: 'rgba(243, 156, 18, 0.25)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      color: 'var(--accent)'
                    }}
                  >
                    {service.icon}
                  </span>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '0.35rem' }}>{service.title}</h3>
                    <p style={{ color: 'rgba(236, 240, 241, 0.75)', fontSize: '0.95rem' }}>{service.subtitle}</p>
                  </div>
                </div>
                <ul style={{ display: 'grid', gap: '0.65rem', color: 'rgba(236, 240, 241, 0.85)', paddingLeft: '1rem' }}>
                  {service.points.map((point) => (
                    <li key={point} style={{ listStyle: 'disc' }}>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid--two" style={{ alignItems: 'center' }}>
          <div className="card" style={{ order: 2 }}>
            <h2 className="section__title" style={{ fontSize: '2rem' }}>Why drivers choose St. John&apos;s Auto Repair</h2>
            <div className="stack">
              {valueProps.map((value) => (
                <div key={value.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span
                    style={{
                      width: '2.25rem',
                      height: '2.25rem',
                      borderRadius: '0.75rem',
                      background: 'rgba(243, 156, 18, 0.18)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      color: 'var(--accent)'
                    }}
                  >
                    {value.icon}
                  </span>
                  <div className="stack" style={{ gap: '0.35rem' }}>
                    <h3 style={{ fontSize: '1.15rem' }}>{value.title}</h3>
                    <p className="helper-text" style={{ fontSize: '0.95rem', color: 'rgba(236, 240, 241, 0.7)' }}>{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="card"
            style={{ order: 1, background: 'linear-gradient(135deg, rgba(243, 156, 18, 0.18), rgba(44, 62, 80, 0.75))' }}
          >
            <div className="stack" style={{ gap: '1rem' }}>
              <h3 style={{ fontSize: '1.5rem' }}>Emergency help, maintenance, and everything in between.</h3>
              <p className="helper-text" style={{ fontSize: '1rem', color: 'rgba(236, 240, 241, 0.75)' }}>
                Text us photos or videos of your issue and get a repair plan within hours. We bring factory-grade tools and OEM-quality
                parts directly to you, eliminating the need for a tow.
              </p>
              <Link to="/request-quote" className="button">
                Get a personalized repair plan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const serviceHighlights = [
  {
    title: 'Diagnostics &amp; Electrical',
    subtitle: 'Pinpoint issues quickly with advanced scan tools',
    icon: '01',
    points: ['On-site computer diagnostics', 'Battery, starter, and alternator repairs', 'Electrical troubleshooting & wiring repairs']
  },
  {
    title: 'Engine &amp; Drivetrain',
    subtitle: 'Complete engine services without the shop wait times',
    icon: '02',
    points: ['Timing belts and water pumps', 'Fuel system service & tune-ups', 'Transmission maintenance & fluid service']
  },
  {
    title: 'Brakes &amp; Suspension',
    subtitle: 'Stop safely with premium components and expert installation',
    icon: '03',
    points: ['Brake pad & rotor replacement', 'ABS system diagnostics', 'Shocks, struts, and suspension components']
  },
  {
    title: 'Fleet &amp; Commercial',
    subtitle: 'Keep your business vehicles on the road with flexible scheduling',
    icon: '04',
    points: ['Fleet maintenance programs', 'DOT inspections & documentation', 'After-hours and weekend availability']
  }
];

const valueProps = [
  {
    title: 'Certified expertise at your driveway',
    description: 'Over 12 years of experience with domestic and import vehicles, backed by ASE Master certification.',
    icon: '✓'
  },
  {
    title: 'Transparent, upfront pricing',
    description: 'Digital estimates with labor and part breakdowns. Approve work from your phone before we turn a wrench.',
    icon: '$'
  },
  {
    title: 'Mobile-first experience',
    description: 'SMS updates, photo reports, and secure online payments keep you in control even while you&apos;re on the go.',
    icon: '📱'
  }
];

export default Home;
