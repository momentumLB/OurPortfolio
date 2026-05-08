import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

// ─── Portal data ────────────────────────────────────────────────────────────

const PORTALS = [
  { id: 'projects',  label: 'Projects',  to: '/projects',  icon: 'ri-folder-4-line'   },
  { id: 'services',  label: 'Services',  to: '/services',  icon: 'ri-flashlight-line' },
  { id: 'marketing', label: 'Marketing', to: '/marketing', icon: 'ri-line-chart-line' },
  { id: 'contact',   label: 'Contact',   to: '/contact',   icon: 'ri-message-3-line'  },
] as const;

// ─── Constants ───────────────────────────────────────────────────────────────

const DOT_SIZE = 22;
const EASE = [0.22, 1, 0.36, 1] as const;

// Node colors (violet / purple / fuchsia family)
const NODE_COLORS = ['139,92,246', '167,139,250', '192,38,211', '109,40,217', '124,58,237'];
const PACKET_COLOR = '34,211,238'; // cyan

// ─── Canvas network background ───────────────────────────────────────────────

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = () => canvas.width;
    const H = () => canvas.height;

    const init = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    init();

    // ── Nodes ──
    type Node = {
      x: number; y: number;
      vx: number; vy: number;
      size: number;
      opacity: number;
      phase: number; phaseSpeed: number;
      color: string;
      hotTimer: number; hotDuration: number; isHot: boolean;
    };

    const makeNodes = (): Node[] => {
      const count = Math.max(40, Math.min(75, Math.floor((W() * H()) / 13_000)));
      return Array.from({ length: count }, () => ({
        x: Math.random() * W(),
        y: Math.random() * H(),
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        size: Math.random() * 2.2 + 1,
        opacity: Math.random() * 0.45 + 0.2,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: (Math.random() * 0.7 + 0.3) * 0.022,
        color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
        hotTimer: 0, hotDuration: 0, isHot: false,
      }));
    };

    let nodes = makeNodes();

    // ── Data packets ──
    type Packet = { from: number; to: number; progress: number; speed: number };
    const packets: Packet[] = [];
    let lastPacket = 0;

    const spawnPacket = (ts: number) => {
      if (ts - lastPacket < 380 || packets.length >= 10) return;
      lastPacket = ts;
      const DIST = 210;
      const from = Math.floor(Math.random() * nodes.length);
      const neighbors: number[] = [];
      nodes.forEach((n, i) => {
        if (i === from) return;
        const dx = n.x - nodes[from].x;
        const dy = n.y - nodes[from].y;
        if (dx * dx + dy * dy < DIST * DIST) neighbors.push(i);
      });
      if (neighbors.length)
        packets.push({ from, to: neighbors[Math.floor(Math.random() * neighbors.length)], progress: 0, speed: 0.007 + Math.random() * 0.011 });
    };

    // ── Scanline state ──
    let scanY = Math.random() * H();

    // ── Resize ──
    const onResize = () => {
      const pW = W(), pH = H();
      init();
      nodes.forEach(n => { n.x = n.x / pW * W(); n.y = n.y / pH * H(); });
    };
    window.addEventListener('resize', onResize);

    // ── Draw loop ──
    let frame = 0;
    let raf: number;

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, W(), H());
      frame++;

      spawnPacket(ts);

      // Trigger hot node occasionally
      if (frame % 85 === 0) {
        const idx = Math.floor(Math.random() * nodes.length);
        nodes[idx].isHot = true;
        nodes[idx].hotTimer = 0;
        nodes[idx].hotDuration = 70 + Math.random() * 60;
      }

      // Update nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        n.phase += n.phaseSpeed;
        if (n.x < 0 || n.x > W()) n.vx *= -1;
        if (n.y < 0 || n.y > H()) n.vy *= -1;
        if (n.isHot) { n.hotTimer++; if (n.hotTimer > n.hotDuration) n.isHot = false; }
      });

      // Scanline (slow sweep top→bottom)
      scanY += 0.45;
      if (scanY > H() + 30) scanY = -30;
      const sg = ctx.createLinearGradient(0, scanY - 25, 0, scanY + 25);
      sg.addColorStop(0,   'rgba(139,92,246,0)');
      sg.addColorStop(0.5, 'rgba(139,92,246,0.045)');
      sg.addColorStop(1,   'rgba(139,92,246,0)');
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY - 25, W(), 50);

      // Connections
      const CONN = 210;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const d2 = dx * dx + dy * dy;
          if (d2 > CONN * CONN) continue;
          const dist = Math.sqrt(d2);
          const alpha = (1 - dist / CONN) * 0.38;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }

      // Packets
      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k];
        p.progress += p.speed;
        if (p.progress >= 1) { packets.splice(k, 1); continue; }
        const fx = nodes[p.from].x, fy = nodes[p.from].y;
        const tx = nodes[p.to].x,   ty = nodes[p.to].y;
        const px = fx + (tx - fx) * p.progress;
        const py = fy + (ty - fy) * p.progress;
        // Glow
        const g = ctx.createRadialGradient(px, py, 0, px, py, 7);
        g.addColorStop(0, `rgba(${PACKET_COLOR},0.85)`);
        g.addColorStop(1, `rgba(${PACKET_COLOR},0)`);
        ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        // Core
        ctx.beginPath(); ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PACKET_COLOR},1)`; ctx.fill();
      }

      // Nodes
      nodes.forEach(n => {
        const pulse   = Math.sin(n.phase) * 0.3 + 0.7;
        const opacity = n.opacity * pulse;

        if (n.isHot) {
          const t = n.hotTimer / n.hotDuration;
          const intensity = t < 0.5 ? t * 2 : 1 - (t - 0.5) * 2;
          // Hot glow halo
          const hg = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 14);
          hg.addColorStop(0, `rgba(${PACKET_COLOR},${intensity * 0.75})`);
          hg.addColorStop(1, `rgba(${PACKET_COLOR},0)`);
          ctx.beginPath(); ctx.arc(n.x, n.y, n.size * 14, 0, Math.PI * 2);
          ctx.fillStyle = hg; ctx.fill();
          // Hot core
          ctx.beginPath(); ctx.arc(n.x, n.y, n.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${PACKET_COLOR},${0.9 * intensity + 0.1})`; ctx.fill();
        } else {
          // Regular glow
          const rg = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 7);
          rg.addColorStop(0, `rgba(${n.color},${opacity * 0.75})`);
          rg.addColorStop(1, `rgba(${n.color},0)`);
          ctx.beginPath(); ctx.arc(n.x, n.y, n.size * 7, 0, Math.PI * 2);
          ctx.fillStyle = rg; ctx.fill();
          // Core
          ctx.beginPath(); ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${n.color},${opacity})`; ctx.fill();
        }
      });

      // Vignette
      const vg = ctx.createRadialGradient(W() / 2, H() / 2, H() * 0.25, W() / 2, H() / 2, H() * 0.82);
      vg.addColorStop(0, 'rgba(2,2,8,0)');
      vg.addColorStop(1, 'rgba(2,2,8,0.65)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W(), H());

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ─── Main component ──────────────────────────────────────────────────────────

export function HeroPortals() {
  const [hovered, setHovered]       = useState<number | null>(null);
  const [portalSize, setPortalSize] = useState(210);
  // Detect touch-primary devices (no hover) once on mount
  const [isTouch] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches
  );
  const rm = useReducedMotion();

  useEffect(() => {
    const upd = () =>
      setPortalSize(Math.min(210, window.innerWidth * 0.35, window.innerHeight * 0.35));
    upd();
    window.addEventListener('resize', upd);
    return () => window.removeEventListener('resize', upd);
  }, []);

  // Scroll to top instantly on mount, then lock
  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = prev; };
  }, []);

  return (
    <div className="relative z-10 min-h-[100dvh] w-full overflow-hidden bg-[#020208]">

      {/* ── Animated network background ── */}
      {!rm && <NetworkCanvas />}

      {/* ── Full-screen crosshair ── */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {/* Horizontal */}
        <motion.div
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2 origin-center"
          style={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.55) 15%, rgba(139,92,246,0.55) 85%, transparent 100%)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.8, ease: EASE }}
        />
        {/* Vertical */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 origin-center"
          style={{ width: 1, background: 'linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.55) 15%, rgba(139,92,246,0.55) 85%, transparent 100%)' }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.1, delay: 0.95, ease: EASE }}
        />
        {/* Quadrant tick marks */}
        {[
          { cls: 'top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2', w: 10, h: 1 },
          { cls: 'top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2', w: 10, h: 1 },
          { cls: 'top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2', w: 1,  h: 10 },
          { cls: 'top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2', w: 1,  h: 10 },
        ].map((t, i) => (
          <motion.div key={i} className={`absolute ${t.cls} bg-violet-400/50`}
            style={{ width: t.w, height: t.h }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.35 + i * 0.06 }} />
        ))}
        {/* Edge ticks */}
        {[
          { cls: 'top-1/2 left-3    -translate-y-1/2', w: 14, h: 1 },
          { cls: 'top-1/2 right-3   -translate-y-1/2', w: 14, h: 1 },
          { cls: 'left-1/2 top-3    -translate-x-1/2', w: 1,  h: 14 },
          { cls: 'left-1/2 bottom-3 -translate-x-1/2', w: 1,  h: 14 },
        ].map((t, i) => (
          <motion.div key={i} className={`absolute ${t.cls} bg-violet-400/38`}
            style={{ width: t.w, height: t.h }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.5 + i * 0.05 }} />
        ))}
        {/* Center diamond */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 border border-violet-400/70 rotate-45"
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.55, ease: EASE }} />
        {/* Corner brackets */}
        {[
          { cls: 'top-5 left-5',    b: 'border-t border-l' },
          { cls: 'top-5 right-5',   b: 'border-t border-r' },
          { cls: 'bottom-5 left-5', b: 'border-b border-l' },
          { cls: 'bottom-5 right-5',b: 'border-b border-r' },
        ].map((c, i) => (
          <motion.div key={i} className={`absolute ${c.cls} ${c.b} border-violet-400/35 w-7 h-7`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.6 + i * 0.07 }} />
        ))}
      </div>

      {/* ── Brand headline — top center ── */}
      <motion.div
        className="absolute inset-x-0 top-[7%] sm:top-[9%] text-center px-4 pointer-events-none select-none z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
      >
        <p className="text-[9px] sm:text-[10px] tracking-[0.38em] uppercase text-violet-300/50 mb-2 font-medium">
          Digital Agency · Lebanon
        </p>
        <h1 className="font-display text-[2.1rem] sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none">
          <span className="text-white">Momentum</span>
          <span className="gradient-text">LB</span>
        </h1>
        <p className="text-white/22 text-[11px] sm:text-sm mt-2 tracking-wide">
          Web Development &amp; Marketing
        </p>
      </motion.div>

      {/* ── Full-screen 2×2 portal grid ── */}
      {/* max-sm padding keeps expanded portals from overlapping the headline/hint on small phones */}
      <div
        role="group"
        aria-label="Site navigation"
        className="absolute inset-0 grid grid-cols-2 grid-rows-2 z-10 max-sm:pt-[14%] max-sm:pb-[8%]"
      >
        {PORTALS.map((portal, i) => {
          const isHovered = hovered === i;

          const circle = (
            <motion.div
              className="relative flex items-center justify-center"
              style={{
                borderRadius: '50%',
                background: 'radial-gradient(circle at center, #5b21b6 0%, #7c3aed 40%, #a855f7 70%, #c026d3 100%)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{
                opacity: 1, scale: 1,
                width:  isHovered ? portalSize : DOT_SIZE,
                height: isHovered ? portalSize : DOT_SIZE,
              }}
              transition={{
                opacity: { duration: 0.5,  delay: 0.5 + i * 0.12 },
                scale:   { duration: 0.7,  delay: 0.5 + i * 0.12, ease: EASE },
                width:   { duration: rm ? 0 : 0.55, ease: EASE },
                height:  { duration: rm ? 0 : 0.55, ease: EASE },
              }}
              onHoverStart={isTouch ? undefined : () => setHovered(i)}
              onHoverEnd={isTouch ? undefined : () => setHovered(null)}
            >
              {/* Ping ring */}
              {!rm && (
                <motion.div
                  className="absolute rounded-full border border-violet-400/55 pointer-events-none"
                  style={{ width: 54, height: 54 }}
                  animate={{
                    scale:   isHovered ? 3.2 : [1, 2.9, 1],
                    opacity: isHovered ? 0   : [0.9, 0, 0.9],
                  }}
                  transition={{
                    scale:   { duration: isHovered ? 0.4 : 2.8, repeat: isHovered ? 0 : Infinity, ease: 'easeOut' },
                    opacity: { duration: isHovered ? 0.3 : 2.8, repeat: isHovered ? 0 : Infinity, ease: 'easeOut' },
                  }}
                />
              )}
              {/* Glow halo */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(124,58,237,0.72) 0%, rgba(168,85,247,0.35) 50%, transparent 80%)',
                  filter: 'blur(24px)',
                  zIndex: -1,
                }}
                animate={{ opacity: isHovered ? 1 : 0.2, scale: isHovered ? 1.6 : 0.7 }}
                transition={{ duration: rm ? 0 : 0.45, ease: EASE }}
              />
              {/* Icon + label */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none select-none"
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 16 }}
                transition={{
                  opacity: { duration: rm ? 0 : 0.25, delay: isHovered ? 0.22 : 0 },
                  y:       { duration: rm ? 0 : 0.3,  delay: isHovered ? 0.20 : 0, ease: EASE },
                }}
              >
                <i className={`${portal.icon} text-white/75 text-2xl`} />
                <span className="text-white font-semibold text-base tracking-wide">{portal.label}</span>
              </motion.div>
            </motion.div>
          );

          return (
            <div
              key={portal.id}
              className="flex items-center justify-center"
              // Touch: tap on empty cell area collapses the open portal
              onClick={() => { if (isTouch) setHovered(null); }}
            >
              <Link
                to={portal.to}
                aria-label={`Go to ${portal.label}`}
                className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020208]"
                onClick={(e) => {
                  if (!isTouch) return; // desktop: Link navigates normally
                  e.stopPropagation();  // prevent cell handler from collapsing
                  if (hovered === i) return; // second tap: let Link navigate
                  e.preventDefault();        // first tap: expand only
                  setHovered(i);
                }}
              >
                {circle}
              </Link>
            </div>
          );
        })}
      </div>

      {/* ── Hint ── */}
      <motion.p
        className="absolute bottom-[5%] sm:bottom-[7%] inset-x-0 text-center text-white/18 text-[9px] sm:text-[10px] tracking-[0.35em] uppercase pointer-events-none select-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.7 }}
      >
        {isTouch ? 'Tap to explore' : 'Hover to explore'}
      </motion.p>
    </div>
  );
}
