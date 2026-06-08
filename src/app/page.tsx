"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveRobotSpline } from "../components/InteractiveRobotSpline";
import { SkillsOrbital } from "../components/SkillsOrbital";

const ROBOT_SCENE_URL =
  "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

/* ─── DESIGN TOKEN CSS (ESTÉTICA BLACK & VIOLET) ─── */
const PORTFOLIO_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    /* Fondos Black */
    --bg-void:    #000000; 
    --bg-dark:    #0a0a0a; 
    --bg-card:    rgba(255,255,255,0.03);
    --bg-glass:   rgba(0,0,0,0.6);
    --border:     rgba(255,255,255,0.08);
    --border-hi:  rgba(139, 92, 246, 0.4); 
    
    /* Textos */
    --text:       #f8fafc;
    --muted:      #94a3b8;
    --faint:      #475569;
    
    /* Acentos Violeta Premium */
    --accent:     #8b5cf6; 
    --accent-d:   rgba(139, 92, 246, 0.15);
    --accent-g:   rgba(139, 92, 246, 0.3);
    --cyan:       #d8b4fe; 
    --cyan-d:     rgba(216, 180, 254, 0.15);
    
    /* Tipografías */
    --fd: 'Bebas Neue', sans-serif;
    --fb: 'DM Sans', sans-serif;
    --fm: 'JetBrains Mono', monospace;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg-void);
    color: var(--text);
    font-family: var(--fb);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg-void); }
  ::-webkit-scrollbar-thumb { background: var(--faint); border-radius: 2px; }

  /* ── NAV ── */
  .pf-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 3rem;
    background: var(--bg-glass);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    transition: border-color .3s;
  }
  .pf-nav.scrolled { border-bottom-color: rgba(139, 92, 246, 0.2); }
  .pf-nav-logo { font-family: var(--fm); font-size: .875rem; color: var(--accent); letter-spacing: .05em; font-weight: 500;}
  .pf-nav-links { display: flex; gap: 2rem; list-style: none; }
  .pf-nav-links a { font-size: .8rem; color: var(--muted); text-decoration: none; letter-spacing: .08em; text-transform: uppercase; transition: color .2s; }
  .pf-nav-links a:hover { color: var(--text); }
  .pf-nav-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px var(--accent-g); animation: pf-pulse 2s ease-in-out infinite; }

  /* ── HERO ── */
  .pf-hero {
    min-height: 100vh; display: flex; align-items: center;
    padding: 6rem 3rem 3rem;
    position: relative; overflow: hidden;
  }
  .pf-hero-glow {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 700px; height: 700px; border-radius: 50%;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .pf-hero-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 4rem; align-items: center;
    width: 100%; max-width: 1200px; margin: 0 auto;
  }

  .pf-eyebrow {
    font-family: var(--fm); font-size: .75rem;
    color: var(--accent); letter-spacing: .15em; text-transform: uppercase;
    margin-bottom: 1.5rem;
    display: flex; align-items: center; gap: .75rem;
  }
  .pf-eyebrow::before { content: ''; display: block; width: 32px; height: 1px; background: var(--accent); }

  .pf-name {
    font-family: var(--fd);
    font-size: clamp(4rem, 8vw, 7rem);
    line-height: .9; letter-spacing: .02em;
    margin-bottom: .5rem;
  }
  .pf-name span {
    background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .pf-role {
    font-family: var(--fd);
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    color: var(--muted); letter-spacing: .05em; margin-bottom: 1.5rem;
  }
  .pf-desc { font-size: 1rem; color: var(--muted); line-height: 1.7; max-width: 450px; margin-bottom: 2.5rem; }
  .pf-btns { display: flex; gap: 1rem; flex-wrap: wrap; }

  .pf-btn-beam {
    position: relative; overflow: hidden;
    padding: .75rem 1.75rem; border-radius: 6px;
    font-size: .875rem; font-weight: 500; cursor: pointer;
    border: 1px solid var(--border-hi);
    background: transparent; color: var(--text);
    letter-spacing: .05em; text-transform: uppercase;
    text-decoration: none; display: inline-flex; align-items: center;
  }
  .pf-btn-beam::before {
    content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
    background: conic-gradient(from 0deg, transparent 0%, var(--accent) 10%, transparent 20%);
    animation: pf-beam 2.5s linear infinite; opacity: 0; transition: opacity .3s;
  }
  .pf-btn-beam::after {
    content: ''; position: absolute; inset: 1px; border-radius: 5px;
    background: var(--bg-void); z-index: 1;
  }
  .pf-btn-beam span { position: relative; z-index: 2; }
  .pf-btn-beam:hover::before { opacity: 1; }

  .pf-btn-solid {
    padding: .75rem 1.75rem; border-radius: 6px;
    font-size: .875rem; font-weight: 500; cursor: pointer;
    background: var(--accent); color: #000000;
    border: none; letter-spacing: .05em; text-transform: uppercase;
    transition: opacity .2s, transform .15s;
    text-decoration: none; display: inline-flex; align-items: center;
  }
  .pf-btn-solid:hover { opacity: .9; transform: translateY(-1px); }

  .pf-robot-slot {
    position: relative; border-radius: 16px; overflow: hidden;
    border: 1px solid var(--border);
    background: var(--bg-dark);
    aspect-ratio: 1;
    transition: border-color .3s, transform .15s ease-out;
  }
  .pf-robot-slot:hover { border-color: var(--border-hi); }
  .pf-corner { position: absolute; width: 18px; height: 18px; border-color: var(--accent); border-style: solid; }
  .pf-corner-tl { top: 8px; left: 8px; border-width: 1px 0 0 1px; }
  .pf-corner-tr { top: 8px; right: 8px; border-width: 1px 1px 0 0; }
  .pf-corner-bl { bottom: 8px; left: 8px; border-width: 0 0 1px 1px; }
  .pf-corner-br { bottom: 8px; right: 8px; border-width: 0 1px 1px 0; }
  .pf-robot-slot canvas, .pf-robot-slot > div { width: 100% !important; height: 100% !important; }

  .pf-scroll-hint {
    position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: .5rem;
    font-family: var(--fm); font-size: .65rem; color: var(--faint);
    letter-spacing: .15em; text-transform: uppercase;
  }
  .pf-scroll-line {
    width: 1px; height: 40px;
    background: linear-gradient(to bottom, var(--faint), transparent);
    animation: pf-scroll-drop 1.5s ease-in-out infinite;
  }

  /* ── ABOUT ── */
  .pf-about { padding: 7rem 3rem; max-width: 1200px; margin: 0 auto; }
  .pf-sec-tag {
    font-family: var(--fm); font-size: .7rem; color: var(--accent);
    letter-spacing: .2em; text-transform: uppercase; margin-bottom: .75rem;
    display: flex; align-items: center; gap: .5rem;
  }
  .pf-sec-tag::before { content: '//'; opacity: .5; }
  .pf-sec-title {
    font-family: var(--fd); font-size: clamp(3rem, 5vw, 5rem);
    line-height: .9; margin-bottom: 4rem;
  }

  .pf-about-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  .pf-orbital-col { position: relative; }
  .pf-about-text-col { display: flex; flex-direction: column; gap: 2rem; }
  
  .pf-about-lead { font-family: var(--fd); font-size: clamp(2rem, 3vw, 3rem); line-height: .95; }
  .pf-about-lead em {
    font-style: normal;
    background: linear-gradient(90deg, var(--accent), var(--cyan));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .pf-about-body { font-size: .9375rem; color: var(--muted); line-height: 1.8; }
  .pf-about-body strong { color: var(--text); font-weight: 500; }
  
  .pf-stats-row { display: flex; gap: 2.5rem; }
  .pf-stat-num { font-family: var(--fd); font-size: 3.5rem; color: var(--accent); line-height: 1; }
  .pf-stat-label { font-size: .8125rem; color: var(--faint); margin-top: .2rem; }
  
  .pf-lang-wrap { display: flex; flex-wrap: wrap; gap: .5rem; }
  .pf-lang-pill {
    font-family: var(--fm); font-size: .7rem; padding: .3rem .75rem;
    border: 1px solid var(--border); border-radius: 4px; color: var(--muted);
    background: var(--bg-card); transition: border-color .2s, color .2s;
  }
  .pf-lang-pill:hover { border-color: var(--accent); color: var(--accent); }

  /* ── PROJECTS ── */
  .pf-projects { padding: 7rem 3rem; max-width: 1200px; margin: 0 auto; }
  .pf-project-card {
    background: var(--bg-dark); border: 1px solid var(--border);
    border-radius: 12px; overflow: hidden;
    display: grid; grid-template-columns: 1fr 1fr;
    min-height: 380px; position: relative; margin-bottom: 1.5rem;
    transition: border-color .3s, transform .2s; cursor: pointer;
  }
  .pf-project-card:hover { border-color: var(--border-hi); transform: translateY(-4px); }
  .pf-spotlight {
    position: absolute; inset: 0; pointer-events: none; z-index: 1;
    background: radial-gradient(circle 250px at var(--mx,50%) var(--my,50%),
      rgba(139, 92, 246, 0.08) 0%, transparent 60%);
    opacity: 0; transition: opacity .3s;
  }
  .pf-project-card:hover .pf-spotlight { opacity: 1; }
  
  .pf-project-img {
    background: var(--bg-card);
    display: flex; align-items: center; justify-content: center; padding: 2rem;
  }
  .pf-mockup {
    width: 80%; aspect-ratio: 16/10; border-radius: 6px;
    border: 1px solid var(--border); background: var(--bg-void);
    display: flex; flex-direction: column; overflow: hidden;
    transform: perspective(500px) rotateY(-8deg) rotateX(3deg);
    transition: transform .4s;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }
  .pf-project-card:hover .pf-mockup { transform: perspective(500px) rotateY(-3deg) rotateX(1deg); }
  .pf-mbar {
    height: 20px; background: rgba(255,255,255,.02);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; padding: 0 .5rem; gap: 4px;
  }
  .pf-mdot { width: 6px; height: 6px; border-radius: 50%; }
  .pf-mbody { flex: 1; padding: .6rem; display: flex; flex-direction: column; gap: .4rem; }
  .pf-mline { height: 4px; border-radius: 2px; background: rgba(255,255,255,.07); }
  
  .pf-project-info {
    padding: 2.5rem; display: flex; flex-direction: column;
    justify-content: center; position: relative; z-index: 2;
  }
  .pf-pnum { font-family: var(--fm); font-size: .65rem; color: var(--faint); letter-spacing: .2em; margin-bottom: 1rem; }
  .pf-ptitle { font-family: var(--fd); font-size: 2.2rem; line-height: .95; margin-bottom: .875rem; }
  .pf-pdesc { font-size: .875rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.5rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .pf-tags { display: flex; flex-wrap: wrap; gap: .4rem; margin-bottom: 2rem; }
  .pf-tag {
    font-family: var(--fm); font-size: .65rem; padding: .2rem .55rem;
    border-radius: 3px; background: var(--accent-d); color: var(--accent);
    border: 1px solid rgba(139, 92, 246,.2);
  }
  .pf-tag.cy { background: var(--cyan-d); color: var(--cyan); border-color: rgba(216, 180, 254,.2); }
  .pf-plink {
    display: inline-flex; align-items: center; gap: .4rem;
    font-family: var(--fm); font-size: .75rem; color: var(--accent);
    text-decoration: none; letter-spacing: .05em; transition: gap .2s;
    background: none; border: none; cursor: pointer; padding: 0;
  }
  .pf-plink:hover { gap: .65rem; }

  /* ── CONTACT ── */
  .pf-contact { position: relative; overflow: hidden; padding: 7rem 3rem; border-top: 1px solid var(--border); }
  .pf-retro-grid { position: absolute; inset: 0; pointer-events: none; }
  .pf-retro-grid svg { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; height: 70%; opacity: .38; }
  .pf-contact-inner { position: relative; z-index: 2; max-width: 540px; margin: 0 auto; }
  .pf-contact-title { font-family: var(--fd); font-size: clamp(3rem, 6vw, 5.5rem); line-height: .9; text-align: center; margin-bottom: .875rem; }
  .pf-contact-sub { text-align: center; color: var(--muted); font-size: 1rem; line-height: 1.7; margin-bottom: 3rem; }
  .pf-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
  .pf-form-group { margin-bottom: 1rem; }
  .pf-form-label { display: block; font-family: var(--fm); font-size: .7rem; color: var(--faint); letter-spacing: .1em; text-transform: uppercase; margin-bottom: .4rem; }
  .pf-form-input, .pf-form-textarea {
    width: 100%; background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 6px; padding: .875rem 1rem; color: var(--text);
    font-family: var(--fb); font-size: .9375rem;
    outline: none; resize: none; transition: border-color .2s, background .2s;
  }
  .pf-form-input:focus, .pf-form-textarea:focus { border-color: var(--accent); background: rgba(139, 92, 246,.025); }
  .pf-form-input::placeholder, .pf-form-textarea::placeholder { color: var(--faint); }
  .pf-social-row { display: flex; justify-content: center; gap: .875rem; margin-top: 2.5rem; }
  .pf-social-btn {
    display: flex; align-items: center; gap: .5rem;
    padding: .625rem 1.25rem; border: 1px solid var(--border); border-radius: 6px;
    background: var(--bg-card); color: var(--muted); font-size: .8125rem;
    cursor: pointer; font-family: var(--fb);
    transition: border-color .2s, color .2s, transform .2s;
    text-decoration: none;
  }
  .pf-social-btn:hover { border-color: var(--border-hi); color: var(--text); transform: translateY(-2px); }

  /* ── FOOTER ── */
  .pf-footer {
    border-top: 1px solid var(--border); padding: 2rem 3rem;
    display: flex; align-items: center; justify-content: space-between;
    background: var(--bg-void);
  }
  .pf-footer-copy { font-family: var(--fm); font-size: .7rem; color: var(--faint); }
  .pf-footer-status { display: flex; align-items: center; gap: .5rem; font-family: var(--fm); font-size: .7rem; color: var(--faint); }
  .pf-status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px var(--accent); animation: pf-pulse 2s ease-in-out infinite; }

  /* ── KEYFRAMES ── */
  @keyframes pf-beam    { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes pf-pulse   { 0%,100% { opacity:1; } 50% { opacity:.4; } }
  @keyframes pf-scroll-drop { 0% { opacity:1; transform:scaleY(1) translateY(0); } 100% { opacity:0; transform:scaleY(.5) translateY(100%); } }
  @keyframes pf-fade-up { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

  .pf-fu  { animation: pf-fade-up .7s cubic-bezier(.16,1,.3,1) both; }
  .pf-d1  { animation-delay: .1s; }
  .pf-d2  { animation-delay: .2s; }
  .pf-d3  { animation-delay: .3s; }
  .pf-d4  { animation-delay: .4s; }
  .pf-d5  { animation-delay: .5s; }

  /* ── MOBILE ── */
  @media (max-width: 768px) {
    .pf-nav { padding: 1rem 1.5rem; }
    .pf-nav-links { display: none; }
    .pf-hero { padding: 5rem 1.5rem 4rem; }
    .pf-hero-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .pf-robot-slot { max-width: 320px; margin: 0 auto; }
    .pf-about { padding: 4rem 1.5rem; }
    .pf-about-cols { grid-template-columns: 1fr; gap: 2.5rem; }
    .pf-projects { padding: 4rem 1.5rem; }
    .pf-project-card { grid-template-columns: 1fr; }
    .pf-project-img { display: none; }
    .pf-project-info { padding: 1.75rem; }
    .pf-contact { padding: 4rem 1.5rem; }
    .pf-form-row { grid-template-columns: 1fr; }
    .pf-social-row { flex-direction: column; }
    .pf-footer { flex-direction: column; gap: 1rem; text-align: center; }
  }
`;

/* ─── DATA ───────────────────────────────────────────────────────── */
type ProjectData = {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  tagCy: boolean[];
  image: string;
};

const PROJECTS: ProjectData[] = [
  {
    num: "01",
    title: "SISTEMA DE GESTIÓN EMPRESARIAL",
    desc: "Aplicación de escritorio desarrollada en C# para gestión empresarial integral. Módulos de inventario, facturación, clientes, historial de facturación y reportes. Incluye sistema de seguridad RBAC para control de acceso por niveles de usuario.",
    tags: ["C#", ".NET", "SQL Server"],
    tagCy: [false, false, true],
    image: "/Pagina de Inicio-App.png",
  },
  {
    num: "02",
    title: "WEB REPOSTERÍA YORQUIRIS",
    desc: "Plataforma web moderna y premium para negocio de repostería artesanal. Experiencia fluida y optimizada. Desplegada en Cloudflare Pages.",
    tags: ["Next.js", "Node.js", "HTML", "CSS", "JS"],
    tagCy: [false, true, false, false, true],
    image: "/Pagina de Inicio-Web.png",
  },
];

/* ─── SUB-COMPONENTS ────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`pf-nav${scrolled ? " scrolled" : ""}`}>
      <div className="pf-nav-logo">Valeron</div>
      <ul className="pf-nav-links">
        {["Hero", "About", "Projects", "Contact"].map((l) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`}>{l}</a>
          </li>
        ))}
      </ul>
      <div className="pf-nav-dot" />
    </nav>
  );
}

function HeroSection() {
  const slotRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!slotRef.current) return;
    const rect = slotRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    slotRef.current.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (slotRef.current)
      slotRef.current.style.transform =
        "perspective(900px) rotateY(0deg) rotateX(0deg)";
  }, []);

  return (
    <section id="hero" className="pf-hero">
      <div className="pf-hero-glow" />
      <div className="pf-hero-grid">
        {/* LEFT — Text */}
        <div>
          <div className="pf-eyebrow pf-fu">Disponible para proyectos</div>
          <h1 className="pf-name pf-fu pf-d1">
            <span>Victor</span>
            <br />
            <span>Manuel Valerio</span>
          </h1>
          <p className="pf-role pf-fu pf-d2">
            Software Engineer & Full Stack Web Developer
          </p>
          <p className="pf-desc pf-fu pf-d3">
            Diseño y construyo soluciones integrales, desde aplicaciones de
            escritorio robustas hasta experiencias web inmersivas. Código
            estructurado para escalar y resolver problemas reales.
          </p>
          <div className="pf-btns pf-fu pf-d4">
            <a href="#projects" className="pf-btn-solid">
              Ver Proyectos
            </a>
            <a href="#contact" className="pf-btn-beam">
              <span>Contáctame</span>
            </a>
          </div>
        </div>

        {/* RIGHT — Robot 3D */}
        <div
          ref={slotRef}
          className="pf-robot-slot pf-fu pf-d5"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transition: "transform 0.15s ease-out" }}
        >
          <div className="pf-corner pf-corner-tl" />
          <div className="pf-corner pf-corner-tr" />
          <div className="pf-corner pf-corner-bl" />
          <div className="pf-corner pf-corner-br" />

          <InteractiveRobotSpline
            scene={ROBOT_SCENE_URL}
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="pf-scroll-hint">
        <span>Scroll</span>
        <div className="pf-scroll-line" />
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="pf-about">
      <div className="pf-sec-tag">About</div>
      <h2 className="pf-sec-title">
        SOBRE MÍ
        <br />& SKILLS
      </h2>

      <div className="pf-about-cols">
        <div className="pf-orbital-col">
          <SkillsOrbital />
        </div>

        <div className="pf-about-text-col">
          <div>
            <div className="pf-sec-tag" style={{ marginBottom: ".5rem" }}>
              Visión
            </div>
            <p className="pf-about-lead">
              Built to
              <br />
              <em>Conquer</em>
              <br />
              Tomorrow
            </p>
          </div>

          <p className="pf-about-body">
            Estudiante de Ingeniería de Sistemas en UTESA y desarrollador
            enfocado en construir herramientas que aporten{" "}
            <strong>valor directo al negocio</strong>. Domino arquitecturas
            limpias y metodologías ágiles, adaptándome a las necesidades del
            usuario final, ya sea en la web o en entornos de escritorio.
          </p>

          <div className="pf-stats-row">
            <div>
              <div className="pf-stat-num">1+</div>
              <div className="pf-stat-label">Año de experiencia</div>
            </div>
            <div>
              <div className="pf-stat-num">2+</div>
              <div className="pf-stat-label">Proyectos completados</div>
            </div>
          </div>

          <div>
            <div
              className="pf-sec-tag"
              style={{ marginBottom: ".75rem", fontSize: ".65rem" }}
            >
              Lenguajes
            </div>
            <div className="pf-lang-wrap">
              {[
                "JavaScript",
                "TypeScript",
                "C#",
                "SQL",
                "Python",
                "English",
                "Spanish",
              ].map((l) => (
                <span key={l} className="pf-lang-pill">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, onClick }: { p: ProjectData; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
    const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
    cardRef.current.style.setProperty("--mx", `${x}%`);
    cardRef.current.style.setProperty("--my", `${y}%`);
  };

  return (
    <div
      className="pf-project-card group"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <div className="pf-spotlight" />

      <div className="pf-project-img">
        <div className="pf-mockup" style={{ padding: 0 }}>
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>

      <div className="pf-project-info">
        <div className="pf-pnum">{p.num} / 02</div>
        <h3 className="pf-ptitle">{p.title}</h3>
        <p className="pf-pdesc">{p.desc}</p>
        <div className="pf-tags">
          {p.tags.map((t, i) => (
            <span key={t} className={`pf-tag${p.tagCy[i] ? " cy" : ""}`}>
              {t}
            </span>
          ))}
        </div>
        <button className="pf-plink">
          Ver proyecto <span>↗</span>
        </button>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null,
  );

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProject]);

  return (
    <section id="projects" className="pf-projects">
      <div className="pf-sec-tag">Work</div>
      <h2 className="pf-sec-title">PROYECTOS</h2>

      {PROJECTS.map((p) => (
        <ProjectCard key={p.num} p={p} onClick={() => setSelectedProject(p)} />
      ))}

      {/* ── MODAL CON FRAMER MOTION ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(12px)",
            }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl flex flex-col"
              style={{
                background: "var(--bg-dark)",
                border: "1px solid var(--border)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón Cerrar */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors z-20 border border-white/10"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M1 1l12 12m0-12L1 13" />
                </svg>
              </button>

              {/* Imagen del Proyecto */}
              <div className="w-full aspect-video bg-black/90 relative overflow-hidden border-b border-white/10 flex-shrink-0">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-top opacity-90"
                />
                {/* Gradiente sutil para fusionar la imagen con el fondo oscuro del modal */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)] via-transparent to-transparent opacity-90"></div>
              </div>

              {/* Contenido del Proyecto */}
              <div className="p-8 md:p-10">
                <div className="pf-pnum mb-4">{selectedProject.num} / 02</div>
                <h3
                  className="pf-ptitle"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    marginBottom: "1rem",
                  }}
                >
                  {selectedProject.title}
                </h3>

                <div className="pf-tags" style={{ marginBottom: "2rem" }}>
                  {selectedProject.tags.map((t, i) => (
                    <span
                      key={t}
                      className={`pf-tag${selectedProject.tagCy[i] ? " cy" : ""}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p
                  className="text-muted text-base md:text-lg leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {selectedProject.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function RetroGrid() {
  return (
    <div className="pf-retro-grid">
      <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMax meet">
        <defs>
          <linearGradient id="pfRetroFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.12)" />
          </linearGradient>
        </defs>
        {Array.from({ length: 21 }).map((_, i) => {
          const x = (i / 20) * 800;
          return (
            <line
              key={`v${i}`}
              x1={400 + (x - 400) * 0.05}
              y1={0}
              x2={x}
              y2={400}
              stroke="rgba(139, 92, 246, 0.15)"
              strokeWidth="0.5"
            />
          );
        })}
        {Array.from({ length: 14 }).map((_, i) => {
          const t = i / 14;
          const y = t * t * 400;
          const s = 0.05 + t * 0.95;
          return (
            <line
              key={`h${i}`}
              x1={400 - 400 * s}
              y1={y}
              x2={400 + 400 * s}
              y2={y}
              stroke="rgba(139, 92, 246, 0.1)"
              strokeWidth="0.5"
            />
          );
        })}
        <rect x="0" y="0" width="800" height="400" fill="url(#pfRetroFade)" />
      </svg>
    </div>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState("");

  const handle =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setStatus("Enviando...");

    const formData = new FormData();
    formData.append("access_key", "28555c08-4218-47bb-aabc-3d394ce79701");
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setStatus("¡Mensaje enviado con éxito!");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("Error al enviar, intenta de nuevo.");
    }
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="pf-contact">
      <RetroGrid />
      <div className="pf-contact-inner">
        <div
          className="pf-sec-tag"
          style={{ justifyContent: "center", marginBottom: "1rem" }}
        >
          Contact
        </div>
        <h2 className="pf-contact-title">
          TRABAJEMOS
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, var(--accent), var(--cyan))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            JUNTOS
          </span>
        </h2>

        <form onSubmit={submit}>
          <div className="pf-form-row">
            <div className="pf-form-group">
              <label className="pf-form-label">Nombre</label>
              <input
                className="pf-form-input"
                placeholder="Tu nombre"
                value={form.name}
                onChange={handle("name")}
                required
              />
            </div>
            <div className="pf-form-group">
              <label className="pf-form-label">Email</label>
              <input
                className="pf-form-input"
                type="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={handle("email")}
                required
              />
            </div>
          </div>
          <div className="pf-form-group">
            <label className="pf-form-label">Mensaje</label>
            <textarea
              className="pf-form-textarea"
              rows={5}
              placeholder="Cuéntame sobre tu proyecto..."
              value={form.message}
              onChange={handle("message")}
              required
            />
          </div>
          <button
            type="submit"
            className="pf-btn-solid"
            style={{ width: "100%", marginTop: ".5rem" }}
          >
            {sent ? "✓ Enviado" : "Enviar Mensaje"}
          </button>
          {status && (
            <p
              className="text-center mt-4 text-sm"
              style={{ color: "var(--muted)" }}
            >
              {status}
            </p>
          )}
        </form>

        <div className="pf-social-row">
          <a
            href="https://www.linkedin.com/in/victor-valerio-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="pf-social-btn"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/Victor-Valerio-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="pf-social-btn"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="pf-footer">
      <div className="pf-footer-copy">
        © {new Date().getFullYear()} — Diseñado & desarrollado por Valeron
      </div>
      <div className="pf-footer-status">
        <div className="pf-status-dot" />
        Disponible para proyectos
      </div>
    </footer>
  );
}

/* ─── PAGE ROOT ──────────────────────────────────────────────────── */
export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PORTFOLIO_CSS }} />
      <Nav />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
