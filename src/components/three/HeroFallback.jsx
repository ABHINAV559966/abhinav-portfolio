const HeroFallback = () => (
  <div
    className="absolute inset-0 -z-10"
    aria-hidden="true"
    style={{
      background:
        'radial-gradient(ellipse at 60% 40%, rgba(6,182,212,0.15) 0%, rgba(139,92,246,0.08) 40%, transparent 70%), radial-gradient(ellipse at 20% 80%, rgba(6,182,212,0.1) 0%, transparent 50%), linear-gradient(135deg, #020617 0%, #0a0f1e 50%, #0d1424 100%)',
    }}
  >
    {/* Decorative grid */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    />
    {/* Floating orbs */}
    <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary-500/10 blur-3xl animate-pulse-slow" />
    <div className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-purple-500/8 blur-3xl animate-pulse-slow animate-delay-300" />
  </div>
);

export default HeroFallback;
