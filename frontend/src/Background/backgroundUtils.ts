export const PI: number = Math.PI;
export const cos: (x: number) => number = Math.cos;
export const sin: (x: number) => number = Math.sin;
export const abs: (x: number) => number = Math.abs;
export const sqrt: (x: number) => number = Math.sqrt;
export const pow: (x: number, y: number) => number = Math.pow;
export const round: (x: number) => number = Math.round;
export const random: () => number = Math.random;
export const atan2: (y: number, x: number) => number = Math.atan2;

export const HALF_PI: number = 0.5 * PI;
export const TAU: number = 2 * PI;
export const TO_RAD: number = PI / 180;

export const floor: (n: number) => number = (n: number): number => n | 0;
export const rand: (n: number) => number = (n: number): number => n * random();
export const randIn: (min: number, max: number) => number = (min: number, max: number): number => rand(max - min) + min;
export const randRange: (n: number) => number = (n: number): number => n - rand(2 * n);
export const fadeIn: (t: number, m: number) => number = (t: number, m: number): number => t / m;
export const fadeOut: (t: number, m: number) => number = (t: number, m: number): number => (m - t) / m;
export const fadeInOut: (t: number, m: number) => number = (t: number, m: number): number => {
  let hm: number = 0.5 * m;
  return abs((t + hm) % m - hm) / hm;
};

export const dist: (x1: number, y1: number, x2: number, y2: number) => number =
  (x1: number, y1: number, x2: number, y2: number): number => sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));

export const angle: (x1: number, y1: number, x2: number, y2: number) => number =
  (x1: number, y1: number, x2: number, y2: number): number => atan2(y2 - y1, x2 - x1);

export const lerp: (n1: number, n2: number, speed: number) => number =
  (n1: number, n2: number, speed: number): number => (1 - speed) * n1 + speed * n2;
