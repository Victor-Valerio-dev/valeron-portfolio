"use client";

import { useState, useEffect, useRef } from "react";

/* ─── TYPES ──────────────────────────────────────────────────────── */
interface SkillNode {
  id: number;
  label: string;
  sublabel: string;
  orbitRadius: number;
  orbitSpeed: number;
  color: string;
  description: string;
  level: number;
  startAngle: number;
}

/* ─── DATA ───────────────────────────────────────────────────────── */
const SKILL_NODES: SkillNode[] = [
  {
    id: 1,
    label: "JS",
    sublabel: "JavaScript",
    orbitRadius: 130,
    orbitSpeed: 0.25,
    color: "#F7DF1E",
    description: "ES6+, manipulación del DOM y lógica asíncrona.",
    level: 90,
    startAngle: 0,
  },
  {
    id: 2,
    label: "React",
    sublabel: "React / Next.js",
    orbitRadius: 130,
    orbitSpeed: 0.25,
    color: "#61DAFB",
    description: "UI declarativa, hooks, App Router y optimización SSR.",
    level: 92,
    startAngle: 90,
  },
  {
    id: 3,
    label: "C#",
    sublabel: ".NET",
    orbitRadius: 130,
    orbitSpeed: 0.25,
    color: "#9B4993",
    description: "POO, LINQ, arquitectura de capas y apps de escritorio.",
    level: 92,
    startAngle: 180,
  },
  {
    id: 4,
    label: "Node",
    sublabel: "Backend",
    orbitRadius: 130,
    orbitSpeed: 0.25,
    color: "#68A063",
    description: "APIs REST, Express, gestión de servidores y Event Loop.",
    level: 85,
    startAngle: 270,
  },
  {
    id: 5,
    label: "TS",
    sublabel: "TypeScript",
    orbitRadius: 210,
    orbitSpeed: 0.15,
    color: "#3178C6",
    description: "Tipado estático, interfaces, generics y código seguro.",
    level: 89,
    startAngle: 45,
  },
  {
    id: 6,
    label: "SQL",
    sublabel: "Base de Datos",
    orbitRadius: 210,
    orbitSpeed: 0.15,
    color: "#F29111",
    description: "PostgreSQL, SQL Server, consultas y modelado relacional.",
    level: 76,
    startAngle: 135,
  },
  {
    id: 7,
    label: "Docker",
    sublabel: "DevOps",
    orbitRadius: 210,
    orbitSpeed: 0.15,
    color: "#2496ED",
    description: "Contenedores, Docker Compose y despliegues aislados.",
    level: 65,
    startAngle: 225,
  },
  {
    id: 8,
    label: "Tailwind",
    sublabel: "Estilos",
    orbitRadius: 210,
    orbitSpeed: 0.15,
    color: "#38BDF8",
    description: "Utility-first, diseño responsivo y customización rápida.",
    level: 90,
    startAngle: 315,
  },
];

/* ─── COMPONENT ──────────────────────────────────────────────────── */
export function SkillsOrbital() {
  const [angles, setAngles] = useState<Record<number, number>>(() =>
    Object.fromEntries(SKILL_NODES.map((n) => [n.id, n.startAngle])),
  );
  const [activeId, setActiveId] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  /* Animation loop */
  useEffect(() => {
    if (paused) return;

    const tick = (time: number) => {
      const delta = Math.min(time - lastTimeRef.current, 32);
      lastTimeRef.current = time;

      setAngles((prev) => {
        const next = { ...prev };
        SKILL_NODES.forEach((n) => {
          next[n.id] = (prev[n.id] + n.orbitSpeed * (delta / 16)) % 360;
        });
        return next;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame((t) => {
      lastTimeRef.current = t;
      rafRef.current = requestAnimationFrame(tick);
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused]);

  const handleNodeClick = (id: number) => {
    if (activeId === id) {
      setActiveId(null);
      setPaused(false);
    } else {
      setActiveId(id);
      setPaused(true);
    }
  };

  const activeNode = SKILL_NODES.find((n) => n.id === activeId) ?? null;

  const toXY = (angleDeg: number, r: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
  };

  const uniqueRadii = [...new Set(SKILL_NODES.map((n) => n.orbitRadius))];

  return (
    <div className="relative flex items-center justify-center w-full select-none">
      {/* ── SVG orbital canvas ── */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: 500, height: 500 }}
      >
        {/* Orbit rings */}
        {uniqueRadii.map((r) => (
          <div
            key={r}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: r * 2,
              height: r * 2,
              border: "1px solid rgba(255,255,255,0.06)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Subtle radial glow behind center */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 180,
            height: 180,
            background:
              "radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* CENTER — "Yo" sun */}
        <div
          className="absolute z-20 flex flex-col items-center justify-center rounded-full"
          style={{
            width: 72,
            height: 72,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle at 40% 40%, #d4f57a 0%, #a3e635 55%, #65a30d 100%)",
            boxShadow:
              "0 0 0 1px rgba(163,230,53,0.4), 0 0 28px rgba(163,230,53,0.3), 0 0 60px rgba(163,230,53,0.12)",
          }}
        >
          {/* inner shine */}
          <div
            className="absolute rounded-full"
            style={{
              width: 28,
              height: 18,
              background: "rgba(255,255,255,0.22)",
              top: 10,
              left: 12,
              filter: "blur(4px)",
              borderRadius: "50%",
            }}
          />
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 22,
              color: "#09090b",
              letterSpacing: "0.08em",
              lineHeight: 1,
              position: "relative",
            }}
          >
            YO
          </span>
        </div>

        {/* ORBIT NODES */}
        {SKILL_NODES.map((node) => {
          const angle = angles[node.id] ?? node.startAngle;
          const { x, y } = toXY(angle, node.orbitRadius);
          const isActive = activeId === node.id;

          return (
            <div
              key={node.id}
              className="absolute z-10 cursor-pointer"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                willChange: "transform",
              }}
              onClick={() => handleNodeClick(node.id)}
            >
              {/* Glow ring when active */}
              {isActive && (
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{
                    background: `${node.color}22`,
                    transform: "scale(1.8)",
                  }}
                />
              )}

              {/* Node pill */}
              <div
                className="relative flex items-center justify-center rounded-full transition-all duration-200"
                style={{
                  width: isActive ? 52 : 44,
                  height: isActive ? 52 : 44,
                  background: isActive
                    ? `radial-gradient(circle at 40% 40%, ${node.color}cc, ${node.color}55)`
                    : "rgba(15,15,17,0.9)",
                  border: `1.5px solid ${isActive ? node.color : node.color + "55"}`,
                  boxShadow: isActive
                    ? `0 0 16px ${node.color}55, 0 0 32px ${node.color}22`
                    : "none",
                }}
              >
                <span
                  className="font-mono font-semibold text-center leading-none"
                  style={{
                    fontSize: node.label.length > 5 ? 7.5 : 9,
                    color: isActive ? "#09090b" : node.color,
                    letterSpacing: "0.03em",
                  }}
                >
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Detail panel (right side) con z-50 para corregir el bug ── */}
      <div
        className="absolute z-50 right-0 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none"
        style={{
          width: 200,
          opacity: activeNode ? 1 : 0,
          transform: `translateY(-50%) translateX(${activeNode ? "0" : "12px"})`,
        }}
      >
        {activeNode && (
          <div
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{
              background: "rgba(15,15,17,0.95)",
              border: `1px solid ${activeNode.color}33`,
              boxShadow: `0 0 24px ${activeNode.color}15`,
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: activeNode.color,
                  boxShadow: `0 0 8px ${activeNode.color}`,
                }}
              />
              <span
                className="font-mono text-xs tracking-widest uppercase"
                style={{ color: activeNode.color }}
              >
                {activeNode.sublabel}
              </span>
            </div>

            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 26,
                color: "#f4f4f5",
                letterSpacing: "0.05em",
                lineHeight: 1,
              }}
            >
              {activeNode.label === "JS" || activeNode.label === "TS"
                ? activeNode.sublabel
                : activeNode.label}
            </div>

            <p className="text-xs leading-relaxed" style={{ color: "#71717a" }}>
              {activeNode.description}
            </p>

            {/* Level bar */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span
                  className="font-mono text-xs uppercase tracking-wider"
                  style={{ color: "#3f3f46" }}
                >
                  Nivel
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: activeNode.color }}
                >
                  {activeNode.level}%
                </span>
              </div>
              <div
                className="w-full rounded-full overflow-hidden"
                style={{ height: 2, background: "rgba(255,255,255,0.07)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${activeNode.level}%`,
                    background: `linear-gradient(90deg, ${activeNode.color}88, ${activeNode.color})`,
                  }}
                />
              </div>
            </div>

            <p
              className="font-mono text-xs"
              style={{ color: "#3f3f46", letterSpacing: "0.05em" }}
            >
              Click de nuevo para cerrar
            </p>
          </div>
        )}
      </div>

      {/* ── Hint when nothing active ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest uppercase transition-opacity duration-300"
        style={{
          color: "#3f3f46",
          opacity: activeId ? 0 : 1,
          letterSpacing: "0.15em",
        }}
      >
        Click en un nodo para pausar
      </div>
    </div>
  );
}
