import { useState, useRef } from 'react';

const inputCls = 'mt-2 bg-white border border-[var(--color-border)] px-3 py-2.5 font-[Archivo_Narrow,ui-sans-serif] text-sm text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none transition-colors w-full';
const labelCls = 'font-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)]';

export default function RegisterForm({ defaultVenue = '' }: { defaultVenue?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current?.checkValidity()) { formRef.current?.reportValidity(); return; }

    setSubmitting(true);
    const data = Object.fromEntries(new FormData(formRef.current));

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      console.error('Registration error:', err);
    }

    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-[var(--color-border)] p-10 text-center">
        <p className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest mb-3">Registration received</p>
        <p className="font-[Teko,ui-sans-serif] text-2xl uppercase text-[var(--color-text)]">You are in the draw for the next season.</p>
        <p className="font-[Archivo_Narrow,ui-sans-serif] text-sm text-[var(--color-text-muted)] mt-4 max-w-md mx-auto">
          We will email your captain the fixture list and your first 12:15 slot. Block the lunch hour now.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} className="border border-[var(--color-border)] flex flex-col gap-0" noValidate onSubmit={handleSubmit}>

      <div className="border-b border-[var(--color-border)] p-6 flex flex-col gap-1">
        <label htmlFor="company" className={labelCls}>Company Name</label>
        <input type="text" id="company" name="companyName" required placeholder="Enter your company name" className={inputCls} />
      </div>

      <div className="border-b border-[var(--color-border)] p-6 flex flex-col gap-1">
        <label htmlFor="captain" className={labelCls}>Captain Name</label>
        <input type="text" id="captain" name="captainName" required placeholder="First & Last Name" className={inputCls + ' md:w-1/2'} />
      </div>

      <div className="border-b border-[var(--color-border)] p-6 flex flex-col gap-1">
        <label htmlFor="email" className={labelCls}>Work Email</label>
        <input type="email" id="email" name="workEmail" required placeholder="captain@company.com" className={inputCls} />
        <p className="font-mono text-xs text-[var(--color-text-muted)] mt-1.5">
          No payment to register interest. We only need a work email so we can send the captain the fixtures.
        </p>
      </div>

      <div className="border-b border-[var(--color-border)] p-6 grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="squad-size" className={labelCls}>Expected Squad Size</label>
          <select id="squad-size" name="squadSize" className={inputCls}>
            <option>5-7 Players</option>
            <option>8-10 Players</option>
            <option>11+ Players</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="division" className={labelCls}>Preferred Division</label>
          <select id="division" name="preferredDivision" className={inputCls}>
            <option>Competitive (A)</option>
            <option>Standard (B)</option>
            <option>No preference</option>
          </select>
        </div>
      </div>

      <div className="border-b border-[var(--color-border)] p-6 flex flex-col gap-1">
        <label htmlFor="venue" className={labelCls}>Preferred Venue</label>
        <select id="venue" name="preferredVenue" defaultValue={defaultVenue || 'No preference'} className={inputCls}>
          <option>The Cage, Whitworth Street</option>
          <option>Spinningfields Five</option>
          <option>Castlefield Turf</option>
          <option>Ancoats Arena</option>
          <option>No preference</option>
        </select>
      </div>

      <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="bg-[var(--color-primary)] text-[var(--color-on-dark)] font-mono text-xs tracking-widest uppercase px-8 py-4 border border-[var(--color-primary)] hover:bg-[var(--color-accent)] transition-colors disabled:opacity-60 min-h-[44px]"
        >
          {submitting ? 'Submitting…' : 'Register Team'}
        </button>
        <p className="font-mono text-xs text-[var(--color-text-muted)] flex items-center gap-2">
          <span className="text-[var(--color-primary)]">⏱</span> Time to clock out.
        </p>
      </div>

    </form>
  );
}
