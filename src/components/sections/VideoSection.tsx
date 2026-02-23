export default function VideoSection() {
  return (
    <section className="section-dark py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(var(--gold)) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-3">
            Experience the Atmosphere
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Poppins', serif" }}
          >
            See What BIZCON
            <br />
            <span className="gradient-gold-text">Looks Like</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-base leading-relaxed">
            One room. Hundreds of ambitious minds. Conversations that change the trajectory of businesses.
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-4xl mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden video-glow group"
            style={{ aspectRatio: "16/9" }}
          >
            {/* Gold border accent */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none z-10"
              style={{ boxShadow: "inset 0 0 0 1px hsl(var(--gold)/0.3)" }}
            />

            {/* YouTube Autoplay Embed */}
            <iframe
               src="https://www.youtube.com/embed/KFTQEKXAooE?autoplay=1&mute=1&loop=1&playlist=KFTQEKXAooE&controls=1&rel=0&modestbranding=1"
              title="BIZCON 2025 Conference Highlight"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          

          {/* Caption */}
          <p className="text-center text-white/30 text-sm mt-5 italic">
            See What BIZCON Looks Like — WATCH THIS VIDEO
          </p>
        </div>

        {/* Stats bar below video */}
        <div className="max-w-3xl mx-auto mt-14 grid grid-cols-3 gap-px">
          {[
            { value: "150+", label: "Total Alumni" },
            { value: "1", label: "Editions Hosted" },
            { value: "100%", label: "Would Return" },
          ].map((s) => (
            <div key={s.label} className="text-center py-6">
              <p
                className="text-3xl font-bold gradient-gold-text mb-1"
                style={{ fontFamily: "'Poppins', serif" }}
              >
                {s.value}
              </p>
              <p className="text-white/40 text-xs tracking-wider uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
