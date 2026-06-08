"use client";
import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({
  scene,
  className,
}: InteractiveRobotSplineProps) {
  return (
    <Suspense
      fallback={
        <div
          className={`w-full h-full flex items-center justify-center ${className}`}
        >
          {/* Skeleton que mantiene la estética del portafolio */}
          <div className="relative flex flex-col items-center gap-4">
            {/* Orb pulsante como placeholder */}
            <div className="relative w-36 h-36">
              <div className="absolute inset-0 rounded-full bg-lime-400/10 animate-ping" />
              <div className="absolute inset-2 rounded-full bg-lime-400/10 animate-ping [animation-delay:0.3s]" />
              <div className="absolute inset-4 rounded-full bg-lime-400/5 animate-ping [animation-delay:0.6s]" />
              <div className="absolute inset-0 rounded-full border border-lime-400/20 flex items-center justify-center">
                {/* Spinner SVG */}
                <svg
                  className="animate-spin h-6 w-6 text-lime-400/60"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"
                  />
                </svg>
              </div>
            </div>
            <span
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: "#3f3f46" }}
            >
              Cargando modelo 3D
            </span>
          </div>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
