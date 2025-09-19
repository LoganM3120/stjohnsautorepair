import React from "react";

const testimonials = [
  {
    quote:
      "Lindon rescued us when our SUV wouldn\'t start before a family trip. He arrived within the hour, diagnosed the issue immediately, and had us back on the road that afternoon.",
    name: "Kara M.",
    detail: "Battery & alternator replacement",
  },
  {
    quote:
      "I manage a small delivery fleet and rely on St. John\'s Auto Repair for fast, honest service. Lindon keeps every vehicle running without disrupting our schedule.",
    name: "Devon R.",
    detail: "Fleet maintenance client",
  },
  {
    quote:
      "Fair pricing, professional communication, and the convenience of repairs in my driveway. It\'s the best automotive experience I\'ve had in years.",
    name: "Leslie T.",
    detail: "Brake & suspension service",
  },
];

const milestones = [
  {
    label: "Years of hands-on experience",
    value: "12+",
  },
  {
    label: "Vehicles repaired on-site",
    value: "2,500",
  },
  {
    label: "Average response time",
    value: "< 2 hrs",
  },
];

const About: React.FC = () => {
  return (
    <section className="section" style={{ paddingTop: "6rem" }}>
      <div className="container" style={{ display: "grid", gap: "3rem" }}>
        <header className="stack" style={{ gap: "1rem", textAlign: "center" }}>
          <span className="badge">About St. John&apos;s Auto Repair</span>
          <h1 className="section__title" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Local, mobile, and dedicated to keeping you rolling
          </h1>
          <p className="section__subtitle" style={{ margin: "0 auto", maxWidth: "50rem" }}>
            St. John&apos;s Auto Repair is a fully mobile shop led by ASE-certified
            master technician Lindon J. We deliver dealership-level expertise
            with neighborly care to drivers throughout Jacksonville and St.
            Johns County.
          </p>
        </header>

        <div className="grid grid--two" style={{ alignItems: "stretch" }}>
          <article className="card" style={{ display: "grid", gap: "1.5rem" }}>
            <div className="stack" style={{ gap: "0.75rem" }}>
              <h2 style={{ fontSize: "1.8rem" }}>Meet Lindon</h2>
              <p className="helper-text" style={{ fontSize: "1rem" }}>
                Lindon started St. John&apos;s Auto Repair after more than a decade
                servicing domestic and import vehicles in dealership bays. He saw
                how often customers felt stranded by unexpected breakdowns, long
                waitlists, and unclear pricing. The solution: bring an expert
                technician and the right tools directly to you.
              </p>
            </div>
            <ul
              style={{
                listStyle: "none",
                display: "grid",
                gap: "0.75rem",
              }}
            >
              {[
                "ASE Master Certified technician",
                "Fully equipped mobile service van with OEM-grade diagnostics",
                "Transparent digital estimates before any work begins",
                "Respect for your driveway, schedule, and budget",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    color: "var(--muted)",
                  }}
                >
                  <span
                    style={{
                      width: "0.75rem",
                      height: "0.75rem",
                      borderRadius: "50%",
                      background: "var(--accent)",
                      marginTop: "0.35rem",
                    }}
                  />
                  <span style={{ color: "var(--text)", fontWeight: 600 }}>{item}</span>
                </li>
              ))}
            </ul>
            <div
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              }}
            >
              {milestones.map((milestone) => (
                <div
                  key={milestone.label}
                  style={{
                    padding: "1rem",
                    borderRadius: "0.85rem",
                    background: "linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(30, 64, 175, 0.12))",
                    border: "1px solid rgba(37, 99, 235, 0.2)",
                    textAlign: "center",
                  }}
                >
                  <p style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--accent)" }}>
                    {milestone.value}
                  </p>
                  <p className="helper-text" style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                    {milestone.label}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article
            className="card"
            style={{
              display: "grid",
              gap: "1.25rem",
              background: "linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(30, 64, 175, 0.9))",
              color: "#f8fafc",
            }}
          >
            <h2 style={{ fontSize: "1.8rem" }}>Our promise</h2>
            <p style={{ color: "rgba(226, 232, 240, 0.85)" }}>
              Automotive issues rarely happen on a convenient day. We bring the
              patience, communication, and technical skill to make stressful
              repairs feel manageable. From routine maintenance to urgent
              breakdowns, you can expect punctual arrivals, transparent quotes,
              and lasting repairs.
            </p>
            <ul
              style={{
                listStyle: "none",
                display: "grid",
                gap: "0.75rem",
                color: "rgba(226, 232, 240, 0.85)",
              }}
            >
              <li>Friendly updates before, during, and after every appointment</li>
              <li>Quality parts sourced to match or exceed OEM specifications</li>
              <li>Service coverage across Jacksonville, St. Augustine, and beyond</li>
            </ul>
            <a className="button" href="tel:+19045551234" style={{ alignSelf: "flex-start" }}>
              Call to Request a Quote
            </a>
          </article>
        </div>

        <section className="card" style={{ padding: "2.5rem", display: "grid", gap: "2rem" }}>
          <div className="stack" style={{ gap: "0.5rem" }}>
            <h2 style={{ fontSize: "1.8rem" }}>What drivers are saying</h2>
            <p className="helper-text" style={{ fontSize: "1rem" }}>
              Word of mouth has always been our strongest referral. Here are a
              few notes from local customers who trust Lindon with their
              vehicles.
            </p>
          </div>
          <div className="grid" style={{ gap: "1.5rem" }}>
            {testimonials.map((testimonial) => (
              <blockquote
                key={testimonial.name}
                style={{
                  background: "rgba(37, 99, 235, 0.08)",
                  borderLeft: "4px solid var(--accent)",
                  borderRadius: "0.85rem",
                  padding: "1.5rem",
                  display: "grid",
                  gap: "0.75rem",
                }}
              >
                <p style={{ fontSize: "1.05rem", color: "var(--text)", lineHeight: 1.6 }}>
                  “{testimonial.quote}”
                </p>
                <footer className="helper-text" style={{ color: "var(--muted)" }}>
                  — {testimonial.name}, {testimonial.detail}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default About;
