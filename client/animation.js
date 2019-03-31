const animate = ({ timing, draw, duration }) => {
   const start = performance.now();

   requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      const progress = timing(timeFraction);

      draw(progress);

      if (timeFraction < 1) {
         requestAnimationFrame(animate);
      }
   });
};

// timing function
export const linear = timeFraction => timeFraction;

export const elastic = (timeFraction, x = 1.5) =>
   Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(((20 * Math.PI * x) / 3) * timeFraction);

export const quad = timeFraction => Math.pow(timeFraction, 2);

export const circ = timeFraction => 1 - Math.sin(Math.acos(timeFraction));

export default animate;
