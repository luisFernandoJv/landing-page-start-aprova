// BackgroundEffects.tsx
// Minimal, performant background — only CSS, no framer-motion loops
// This avoids unnecessary JS animation overhead on mobile

export function BackgroundEffects() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Ambient orb top-left */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-15%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsla(36,100%,54%,0.05) 0%, transparent 65%)",
          filter: "blur(60px)",
          animation: "orb-drift-a 20s ease-in-out infinite",
        }}
      />

      {/* Ambient orb bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "-10%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsla(213,90%,60%,0.04) 0%, transparent 65%)",
          filter: "blur(50px)",
          animation: "orb-drift-b 24s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes orb-drift-a {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(20px, -30px); }
        }
        @keyframes orb-drift-b {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(-25px, 20px); }
        }
      `}</style>
    </div>
  );
}
