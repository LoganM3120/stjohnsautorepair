import React, { useState } from 'react';

type PreferredContactMethod = 'phone' | 'text' | 'other';

interface QuoteFormState {
  fullName: string;
  email: string;
  phone: string;
  vin: string;
  concern: string;
  preferredContact: PreferredContactMethod;
  preferredContactOther: string;
}

const defaultFormState: QuoteFormState = {
  fullName: '',
  email: '',
  phone: '',
  vin: '',
  concern: '',
  preferredContact: 'phone',
  preferredContactOther: ''
};

const RequestQuote: React.FC = () => {
  const [formState, setFormState] = useState<QuoteFormState>(defaultFormState);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === 'preferredContact') {
      const preferredValue = value as PreferredContactMethod;
      setFormState((previous) => ({
        ...previous,
        preferredContact: preferredValue,
        preferredContactOther: preferredValue === 'other' ? previous.preferredContactOther : ''
      }));
      return;
    }

    setFormState((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);

    // Placeholder: This is where future integration with an API or CRM would occur.
    console.table(formState);
  };

  return (
    <section className="section" style={{ paddingTop: '6rem' }}>
      <div className="container grid" style={{ gap: '3rem' }}>
        <div className="stack" style={{ gap: '1.25rem' }}>
          <span className="badge">Request a Quote</span>
          <h1 className="section__title" style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)' }}>Tell us what&apos;s going on with your vehicle</h1>
          <p className="section__subtitle" style={{ fontSize: '1rem' }}>
            Share a few details and we&apos;ll reach out with a recommended repair plan, availability, and pricing options.
            We typically respond within one business hour during the day.
          </p>
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.25))' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>What to expect next</h2>
            <ul style={{ display: 'grid', gap: '0.75rem', color: 'var(--muted)', paddingLeft: '1.25rem' }}>
              <li>We&apos;ll review your request and confirm any additional details we need.</li>
              <li>Receive a text or email with a diagnostic plan and upfront estimate.</li>
              <li>Approve the work digitally and pick a time that works around your schedule.</li>
            </ul>
          </div>
        </div>

        <div className="card" style={{ padding: '2.5rem 2rem' }}>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName">Full Name (First and Last)</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="First and last name"
                value={formState.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(555) 555-5555"
                value={formState.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="vin">Vehicle Identification Number (VIN)</label>
              <input
                id="vin"
                name="vin"
                type="text"
                placeholder="17-character VIN"
                value={formState.vin}
                onChange={handleChange}
                maxLength={17}
              />
              <p className="helper-text">You can find your VIN on your registration, insurance card, or driver-side door jamb.</p>
            </div>

            <div>
              <label htmlFor="concern">What is your concern about your vehicle?</label>
              <textarea
                id="concern"
                name="concern"
                placeholder="Describe the issue, warning lights, noises, or recent services performed."
                value={formState.concern}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>

            <div>
              <label htmlFor="preferredContact">What is your preferred method of communication?</label>
              <select
                id="preferredContact"
                name="preferredContact"
                value={formState.preferredContact}
                onChange={handleChange}
              >
                <option value="phone">Phone Call</option>
                <option value="text">Text Message</option>
                <option value="other">Other</option>
              </select>
            </div>

            {formState.preferredContact === 'other' ? (
              <div>
                <label htmlFor="preferredContactOther">Tell us your preferred contact method</label>
                <input
                  id="preferredContactOther"
                  name="preferredContactOther"
                  type="text"
                  placeholder="e.g., WhatsApp, Email, etc."
                  value={formState.preferredContactOther}
                  onChange={handleChange}
                  required
                />
              </div>
            ) : null}

            <button type="submit" className="button" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
              Submit Request
            </button>

            {hasSubmitted ? (
              <p className="helper-text" style={{ color: 'var(--secondary)' }}>
                Thanks! We&apos;ve received your information and will reach out soon.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
};

export default RequestQuote;
