import React, { useEffect, useRef } from "react";
import styles from "./canvas.module.css";

const ConfettiCanvas = ({ openCard }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    if (!openCard) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const pieces = [];
    const colors = [
      "#FF3B30",
      "#34C759",
      "#007AFF",
      "#FFCC00",
      "#AF52DE",
      "#FF9500",
      "#5AC8FA",
    ];

    function ConfettiPiece() {
      const baseAngle = -Math.PI / 2; // ↑ tepa
      const spread = Math.PI / 1.5; // 🔄 chap → o‘ng oraliqda yoyiladi
      const angle = baseAngle + (Math.random() - 0.5) * spread;
      const speed = Math.random() * 6 + 4;

      this.x = W / 2 + (Math.random() - 0.5) * 100;
      this.y = H * 0.3 + Math.random() * 40;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      this.gravity = 0.25;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 8 - 4;
      this.size = Math.random() * 10 + 6;
      this.alpha = 1;
      this.fade = Math.random() * 0.004 + 0.002;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.shape = Math.floor(Math.random() * 4);
    }

    ConfettiPiece.prototype.update = function () {
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.alpha -= this.fade;
    };

    ConfettiPiece.prototype.draw = function () {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);

      switch (this.shape) {
        case 0:
          ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
          break;
        case 1:
          ctx.beginPath();
          ctx.arc(0, 0, this.size / 2, 0, 2 * Math.PI);
          ctx.fill();
          break;
        case 2:
          ctx.fillRect(-this.size, 0, this.size * 2, 2);
          break;
        case 3:
          ctx.beginPath();
          ctx.moveTo(-this.size, 0);
          ctx.quadraticCurveTo(0, this.size, this.size, 0);
          ctx.quadraticCurveTo(0, -this.size, -this.size, 0);
          ctx.fill();
          break;
      }

      ctx.restore();
      ctx.globalAlpha = 1;
    };

    for (let i = 0; i < 220; i++) {
      pieces.push(new ConfettiPiece());
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      pieces.forEach((p) => {
        p.update();
        p.draw();
      });
      animationRef.current = requestAnimationFrame(draw);
    }

    draw();

    const resizeHandler = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", resizeHandler);

    const timeout = setTimeout(() => {
      cancelAnimationFrame(animationRef.current);
      ctx.clearRect(0, 0, W, H);
      window.removeEventListener("resize", resizeHandler);
    }, 8000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeHandler);
    };
  }, [openCard]);

  return <canvas ref={canvasRef} className={styles.canvas}></canvas>;
};

export default ConfettiCanvas;
