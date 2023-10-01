import React, { useEffect } from "react";
import { createNoise3D } from "simplex-noise";
import {
  cos,
  sin,
  TAU,
  rand,
  randRange,
  fadeInOut,
  lerp,
} from "./backgroundUtils"; // Update the path to backgroundUtils

const ParticleBackground: React.FC = () => {
  let container: HTMLElement | null = null;
  let canvas: { a: HTMLCanvasElement | null; b: HTMLCanvasElement | null } = {
    a: null,
    b: null,
  };
  let ctx: {
    a: CanvasRenderingContext2D | null;
    b: CanvasRenderingContext2D | null;
  } = { a: null, b: null };
  let center: number[] = [];
  let tick: number = 0;
  let particleProps: Float32Array;

  const particleCount: number = 700;
  const particlePropCount: number = 9;
  const particlePropsLength: number = particleCount * particlePropCount;
  const rangeY: number = 100;
  const baseTTL: number = 50;
  const rangeTTL: number = 150;
  const baseSpeed: number = 0.1;
  const rangeSpeed: number = 2;
  const baseRadius: number = 1;
  const rangeRadius: number = 4;
  const baseHue: number = 220;
  const rangeHue: number = 100;
  const noiseSteps: number = 8;
  const xOff: number = 0.00125;
  const yOff: number = 0.00125;
  const zOff: number = 0.0005;
  const backgroundColor: string = "hsla(260,40%,5%,1)";

  const setup = () => {
    createCanvas();
    resize();
    initParticles();
    draw();
  };

  const initParticles = () => {
    tick = 0;
    particleProps = new Float32Array(particlePropsLength);

    for (let i: number = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
  };

  const initParticle = (i: number) => {
    let x, y, vx, vy, life, ttl, speed, radius, hue;

    x = rand(canvas.a!.width);
    y = center[1] + randRange(rangeY);
    vx = 0;
    vy = 0;
    life = 0;
    ttl = baseTTL + rand(rangeTTL);
    speed = baseSpeed + rand(rangeSpeed);
    radius = baseRadius + rand(rangeRadius);
    hue = baseHue + rand(rangeHue);

    particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
  };

  const drawParticles = () => {
    for (let i: number = 0; i < particlePropsLength; i += particlePropCount) {
      updateParticle(i);
    }
  };

  const updateParticle = (i: number) => {
    const i2: number = 1 + i,
      i3: number = 2 + i,
      i4: number = 3 + i,
      i5: number = 4 + i,
      i6: number = 5 + i,
      i7: number = 6 + i,
      i8: number = 7 + i,
      i9: number = 8 + i;
    let x: number;
    let y: number;
    let vx, vy, life, ttl, speed, x2, y2, radius, hue;

    x = particleProps[i];
    y = particleProps[i2];

    const noise3d = createNoise3D();
    const n = noise3d(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU;
    vx = lerp(particleProps[i3], cos(n), 0.5);
    vy = lerp(particleProps[i4], sin(n), 0.5);
    life = particleProps[i5];
    ttl = particleProps[i6];
    speed = particleProps[i7];
    x2 = x + vx * speed;
    y2 = y + vy * speed;
    radius = particleProps[i8];
    hue = particleProps[i9];

    drawParticle(x, y, x2, y2, life, ttl, radius, hue);

    life++;

    particleProps[i] = x2;
    particleProps[i2] = y2;
    particleProps[i3] = vx;
    particleProps[i4] = vy;
    particleProps[i5] = life;

    (checkBounds(x, y) || life > ttl) && initParticle(i);
  };

  const drawParticle = (
    x: number,
    y: number,
    x2: number,
    y2: number,
    life: number,
    ttl: number,
    radius: number,
    hue: number
  ) => {
    if (ctx.a === null || ctx.b === null) return;
    ctx.a!.save();
    ctx.a!.lineCap = "round";
    ctx.a!.lineWidth = radius;
    ctx.a!.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
    ctx.a!.beginPath();
    ctx.a!.moveTo(x, y);
    ctx.a!.lineTo(x2, y2);
    ctx.a!.stroke();
    ctx.a!.closePath();
    ctx.a!.restore();
  };

  const checkBounds = (x: number, y: number) => {
    return x > canvas.a!.width || x < 0 || y > canvas.a!.height || y < 0;
  };

  const createCanvas = () => {
    container = document.querySelector(".content--canvas");
    canvas = {
      a: document.createElement("canvas"),
      b: document.createElement("canvas"),
    };

    if (!canvas || !canvas.a || !canvas.b) return;
    canvas.a.style.zIndex = "-1";
    canvas.b.style.cssText = `
      z-index: -1;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `;

    if (!container) return;
    container.appendChild(canvas.b);
    ctx = {
      a: canvas.a!.getContext("2d"),
      b: canvas.b!.getContext("2d"),
    };
    center = [];
  };

  const resize = () => {
    const { innerWidth, innerHeight } = window;

    canvas.a!.width = innerWidth;
    canvas.a!.height = innerHeight;

    if (ctx.a === null || ctx.b === null) return;
    ctx.a!.drawImage(canvas.b!, 0, 0);

    canvas.b!.width = innerWidth;
    canvas.b!.height = innerHeight;

    ctx.b!.drawImage(canvas.a!, 0, 0);

    center[0] = 0.5 * canvas.a!.width;
    center[1] = 0.5 * canvas.a!.height;
  };

  const renderGlow = () => {
    if (ctx.a === null || ctx.b === null) return;
    ctx.b!.save();
    ctx.b!.filter = "blur(8px) brightness(200%)";
    ctx.b!.globalCompositeOperation = "lighter";
    ctx.b!.drawImage(canvas.a!, 0, 0);
    ctx.b!.restore();

    ctx.b!.save();
    ctx.b!.filter = "blur(4px) brightness(200%)";
    ctx.b!.globalCompositeOperation = "lighter";
    ctx.b!.drawImage(canvas.a!, 0, 0);
    ctx.b!.restore();
  };

  const renderToScreen = () => {
    if (ctx.a === null || ctx.b === null) return;
    ctx.b!.save();
    ctx.b!.globalCompositeOperation = "lighter";
    ctx.b!.drawImage(canvas.a!, 0, 0);
    ctx.b!.restore();
  };

  const draw = () => {
    if (ctx.a === null || ctx.b === null) return;
    if (canvas === null || canvas.a === null || canvas.b === null) return;
    tick++;

    ctx.a!.clearRect(0, 0, canvas.a!.width, canvas.a!.height);

    ctx.b!.fillStyle = backgroundColor;
    ctx.b!.fillRect(0, 0, canvas.a!.width, canvas.a!.height);

    drawParticles();
    renderGlow();
    renderToScreen();

    window.requestAnimationFrame(draw);
  };

  useEffect(() => {
    setup();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, );

  return (
    <div className="content--canvas -z-1">
      <canvas className="-z-1" id="canvasA" ref={(el) => (canvas.a = el)} />
      <canvas className="-z-1" id="canvasB" ref={(el) => (canvas.b = el)} />
    </div>
  );
};

export default ParticleBackground;
