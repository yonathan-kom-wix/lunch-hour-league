export default function MobileRegisterStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-40">
      <a
        href="/register"
        className="block bg-[var(--color-primary)] text-[var(--color-on-dark)] font-mono text-sm tracking-widest uppercase text-center py-4 hover:bg-[var(--color-accent)] transition-colors min-h-[44px] flex items-center justify-center"
      >
        Register your team
      </a>
    </div>
  );
}
