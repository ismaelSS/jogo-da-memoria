// This component was created using the linrock user creation.
// link to profile: https://codepen.io/linrock
// link to the original component: https://codepen.io/linrock/pen/nMadjQ

'use client'
import React, { useEffect, useRef } from 'react';

const NUM_CONFETTI = 600;
const COLORS = [
  [85, 71, 106],
  [174, 61, 99],
  [219, 56, 83],
  [244, 92, 68],
  [248, 182, 70],
];
const PI_2 = 2 * Math.PI;

const ConfettiCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let xpos = 0.5;

  const resizeWindow = (canvas: HTMLCanvasElement) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const range = (a: number, b: number) => (b - a) * Math.random() + a;

  const drawCircle = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    style: string
  ) => {
    context.beginPath();
    context.arc(x, y, r, 0, PI_2, false);
    context.fillStyle = style;
    context.fill();
  };

  class Confetti {
    style: number[];
    rgb: string;
    r: number;
    r2: number;
    opacity: number;
    dop: number;
    x: number;
    y: number;
    xmax: number;
    ymax: number;
    vx: number;
    vy: number;

    constructor(private context: CanvasRenderingContext2D, private w: number, private h: number) {
      this.style = COLORS[~~range(0, COLORS.length)];
      this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
      this.r = ~~range(2, 6);
      this.r2 = 2 * this.r;
      this.replace(w, h);
    }

    replace(w: number, h: number) {
      this.opacity = 1;
      this.dop = 0.03 * range(1, 4);
      this.x = range(-this.r2, w - this.r2);
      this.y = range(-20, h - this.r2);
      this.xmax = w - this.r;
      this.ymax = h - this.r;
      this.vx = range(0, 2) + 8 * xpos - 5;
      this.vy = 0.7 * this.r + range(-1, 1);
    }

    draw(w: number, h: number) {
      this.x += this.vx;
      this.y += this.vy;
      this.opacity += this.dop;
      if (this.opacity > 1) {
        this.opacity = 1;
        this.dop *= -1;
      }
      if (this.opacity < 0 || this.y > this.ymax) {
        this.replace(w, h);
      }
      if (!(0 < this.x && this.x < this.xmax)) {
        this.x = (this.x + this.xmax) % this.xmax;
      }
      drawCircle(this.context, ~~this.x, ~~this.y, this.r, `${this.rgb},${this.opacity})`);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    resizeWindow(canvas);

    let confetti: Confetti[] = [];
    for (let i = 0; i < NUM_CONFETTI; i++) {
      confetti.push(new Confetti(context, canvas.width, canvas.height));
    }

    const step = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach((c) => c.draw(canvas.width, canvas.height));
      requestAnimationFrame(step);
    };

    window.addEventListener('resize', () => resizeWindow(canvas));
    document.onmousemove = (e) => {
      xpos = e.pageX / window.innerWidth;
    };

    step();

    return () => {
      window.removeEventListener('resize', () => resizeWindow(canvas));
    };
  }, []);

  return <canvas className='absolute left-0 top-0 w-[100vw] h-[100vh]' id="world" ref={canvasRef}></canvas>;
};

export default ConfettiCanvas;