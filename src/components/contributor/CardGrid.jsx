import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Github, Instagram, Mail } from 'lucide-react';

const ChromaGrid = ({
  items,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const demo = [
    {
      image: 'https://i.pravatar.cc/300?img=8',
      title: 'Alex Rivera',
      subtitle: 'Full Stack Developer',
      socials: { github: 'https://github.com/' },
      borderColor: '#4F46E5',
      gradient: 'linear-gradient(145deg,#4F46E5,#000)',
    },
  ];

  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');

    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };

    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardMove = (e) => {
    const c = e.currentTarget;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-full flex flex-wrap justify-center items-start gap-3 bg-transparent ${className}`}
      style={{
        '--r': `${radius}px`,
        '--x': '50%',
        '--y': '50%',
      }}
    >
      {data.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          className="group relative flex flex-col w-[300px] rounded-[20px] overflow-hidden border-2 border-transparent transition-colors duration-300"
          style={{
            '--card-border': c.borderColor || 'transparent',
            background: c.gradient,
            '--spotlight-color': 'rgba(255,255,255,0.3)',
          }}
        >
          {/* Efek Spotlight */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)',
            }}
          />

          {/* Gambar */}
          <div className="relative z-10 flex-1 p-[10px]">
            <img
              src={c.image}
              alt={c.title}
              loading="lazy"
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>

          {/* Footer dengan nama & sosial */}
          <footer className="relative z-10 p-4 text-white font-sans grid grid-cols-2 gap-x-3 gap-y-1 items-center">
            <div>
              <h3 className="m-0 text-[1.05rem] font-semibold">{c.title}</h3>
              <p className="m-0 text-[0.85rem] opacity-85">{c.subtitle}</p>
            </div>

            <div className="flex gap-3 justify-end">
              {c.socials?.github && (
                <a
                  href={c.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
              )}
              {c.socials?.instagram && (
                <a
                  href={c.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              )}
              {c.socials?.email && (
                <a
                  href={`mailto:${c.socials.email}`}
                  className="text-white/80 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              )}
            </div>
          </footer>
        </article>
      ))}

      {/* Efek Spotlight Utama */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.78)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'transparent',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 15%, rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.22) 45%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.50) 75%, rgba(0,0,0,0.68) 88%, white 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 15%, rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.22) 45%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.50) 75%, rgba(0,0,0,0.68) 88%, white 100%)',
        }}
      />

      {/* Lapisan Fade */}
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.78)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'transparent',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y), white 0%, white 15%, rgba(255,255,255,0.90) 30%, rgba(255,255,255,0.78) 45%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,0.50) 75%, rgba(255,255,255,0.32) 88%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y), white 0%, white 15%, rgba(255,255,255,0.90) 30%, rgba(255,255,255,0.78) 45%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,0.50) 75%, rgba(255,255,255,0.32) 88%, transparent 100%)',
          opacity: 1,
        }}
      />
    </div>
  );
};

export default ChromaGrid;
