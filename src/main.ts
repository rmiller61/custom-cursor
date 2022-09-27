import './style.css';
import { gsap } from 'gsap';

// set the starting position of the cursor outside of the screen
let clientX = -100;
let clientY = -100;

const wrapper = document.getElementById('cursor--wrapper');
const video = document.getElementById('cursor--video') as HTMLVideoElement;
//const cursor = document.getElementById('cursor');

let isPlaying = true;

const initCursor = () => {
  // add listener to track the current mouse position
  if (wrapper) {
    wrapper.addEventListener('mousemove', (e) => {
      clientX = e.clientX;
      clientY = e.clientY;
    });
    wrapper.addEventListener('click', () => {
      if (isPlaying) {
        video.pause();
        isPlaying = false;
      } else {
        video.play();
        isPlaying = true;
      }
    });
  }

  // transform the innerCursor to the current mouse position
  // use requestAnimationFrame() for smooth performance
  const render = () => {
    gsap.to('.cursor--icon', {
      ease: 'linear',
      x: clientX,
      y: clientY,
    });
    gsap.to('.cursor--follow', {
      ease: 'linear',
      x: clientX,
      y: clientY,
      delay: 0.01,
    });

    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

initCursor();
