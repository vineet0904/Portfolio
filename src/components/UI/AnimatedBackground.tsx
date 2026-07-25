import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  direction: 1 | -1;
};

type ShootingStar = {
  x: number;
  y: number;
  length: number;
  speed: number;
  active: boolean;
};

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    
    const context = canvas.getContext("2d");

if (!context) return;

const ctx = context;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    let animationId = 0;

    // ⭐ Stars

    const STAR_COUNT =
      window.innerWidth < 768 ? 90 : 180;

    const stars: Star[] = [];

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,

        radius: Math.random() * 1.8 + 0.3,

        alpha: Math.random() * 0.6 + 0.2,

        twinkleSpeed:
          Math.random() * 0.006 + 0.001,

        direction:
          Math.random() > 0.5 ? 1 : -1,
      });
    }

    // ☄ Shooting Stars

    const shootingStars: ShootingStar[] = [];

    const createShootingStar = () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.4),

      length:
        Math.random() * 120 + 80,

      speed:
        Math.random() * 10 + 8,

      active: false,
    });

    for (let i = 0; i < 3; i++) {
      shootingStars.push(createShootingStar());
    }

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener(
      "resize",
      resize
    );
        // ==========================
    // ⭐ Draw Stars
    // ==========================

    function drawStars() {
      for (const star of stars) {
        star.alpha += star.twinkleSpeed * star.direction;

        if (star.alpha >= 0.85) {
          star.direction = -1;
        }

        if (star.alpha <= 0.15) {
          star.direction = 1;
        }

        ctx.beginPath();

        ctx.arc(
          star.x,
          star.y,
          star.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;

        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(255,255,255,0.45)";

        ctx.fill();
      }

      ctx.shadowBlur = 0;
    }

    // ==========================
    // ☄ Draw Shooting Stars
    // ==========================

    function drawShootingStars() {
      shootingStars.forEach((star) => {

        if (!star.active) {

          if (Math.random() < 0.0015) {

            star.active = true;

            star.x = Math.random() * width;

            star.y = Math.random() * height * 0.35;

          }

          return;
        }

        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
          star.x - star.length,
          star.y - star.length
        );

        gradient.addColorStop(
          0,
          "rgba(255,255,255,1)"
        );

        gradient.addColorStop(
          0.4,
          "rgba(255,255,255,0.6)"
        );

        gradient.addColorStop(
          1,
          "rgba(255,255,255,0)"
        );

        ctx.beginPath();

        ctx.moveTo(star.x, star.y);

        ctx.lineTo(
          star.x - star.length,
          star.y - star.length
        );

        ctx.strokeStyle = gradient;

        ctx.lineWidth = 2;

        ctx.shadowBlur = 12;

        ctx.shadowColor = "white";

        ctx.stroke();

        star.x += star.speed;

        star.y += star.speed;

        if (
          star.x > width + 300 ||
          star.y > height + 300
        ) {
          star.active = false;
        }
      });

      ctx.shadowBlur = 0;
    }
        // ==========================
    // 🌌 Animation Loop
    // ==========================

    function animate() {
      // Clear previous frame
      ctx.clearRect(0, 0, width, height);

      // --------------------------
      // Background Gradient
      // --------------------------

      const bg = ctx.createLinearGradient(
        0,
        0,
        0,
        height
      );

      bg.addColorStop(0, "#02040A");
      bg.addColorStop(0.45, "#050816");
      bg.addColorStop(1, "#0B1120");

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // --------------------------
      // Aurora Glow (Top Left)
      // --------------------------

      const aurora1 = ctx.createRadialGradient(
        width * 0.15,
        height * 0.1,
        0,
        width * 0.15,
        height * 0.1,
        width * 0.45
      );

      aurora1.addColorStop(
        0,
        "rgba(99,102,241,0.08)"
      );

      aurora1.addColorStop(
        1,
        "rgba(99,102,241,0)"
      );

      ctx.fillStyle = aurora1;

      ctx.fillRect(0, 0, width, height);

      // --------------------------
      // Aurora Glow (Bottom Right)
      // --------------------------

      const aurora2 = ctx.createRadialGradient(
        width * 0.85,
        height * 0.85,
        0,
        width * 0.85,
        height * 0.85,
        width * 0.35
      );

      aurora2.addColorStop(
        0,
        "rgba(255,255,255,0.025)"
      );

      aurora2.addColorStop(
        1,
        "rgba(255,255,255,0)"
      );

      ctx.fillStyle = aurora2;

      ctx.fillRect(0, 0, width, height);

      // --------------------------
      // Draw Objects
      // --------------------------

      drawStars();

      drawShootingStars();

      // --------------------------
      // Continue Animation
      // --------------------------

      animationId =
        requestAnimationFrame(animate);
    }

    // Start Animation

    animate();
        // ==========================
    // Cleanup
    // ==========================

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />

      {/* Premium Noise */}
      <div className="absolute inset-0 noise-layer opacity-[0.025]" />

      {/* Top Left Glow */}
      <div
        className="absolute rounded-full blur-[160px]"
        style={{
          width: "650px",
          height: "650px",
          top: "-260px",
          left: "-260px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0) 70%)",
        }}
      />

      {/* Bottom Right Glow */}
      <div
        className="absolute rounded-full blur-[180px]"
        style={{
          width: "520px",
          height: "520px",
          bottom: "-180px",
          right: "-180px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 75%)",
        }}
      />

      {/* Center Glow */}
      <div
        className="absolute rounded-full blur-[140px]"
        style={{
          width: "420px",
          height: "420px",
          left: "50%",
          top: "35%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.045) 0%, rgba(59,130,246,0) 70%)",
        }}
      />

      {/* Soft Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 45%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </div>
  );
}