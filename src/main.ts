import './style.css';
import { gsap } from 'gsap';

// set the starting position of the cursor outside of the screen
let clientX = 0;
let clientY = 0;

const wrapper = document.getElementById('cursor--wrapper');
const video = document.getElementById('cursor--video') as HTMLVideoElement;
//const cursor = document.getElementById('cursor');

let isPlaying = true;
let isTouch = false;

window.addEventListener(
  'touchstart',
  function onFirstTouch() {
    // we could use a class
    isTouch = true;

    // we only need to know once that a human touched the screen, so we can stop listening now
    window.removeEventListener('touchstart', onFirstTouch, false);
  },
  false
);

const initCursor = () => {
  // add listener to track the current mouse position
  if (wrapper) {
    const { x, y, height, width } = wrapper.getBoundingClientRect();
    clientX = width / 2 - 50;
    clientY = height / 2 - 50;
    wrapper.addEventListener('mousemove', (e) => {
      if (!isTouch) {
        clientX = e.clientX - x;
        clientY = e.clientY - y;
      }
    });
    wrapper.addEventListener('click', () => {
      if (isPlaying) {
        video.pause();
        isPlaying = false;
        gsap.to('.cursor--body', {
          ease: 'linear',
          opacity: 1,
        });
        gsap.to('.pause', {
          ease: 'linear',
          opacity: 1,
          delay: 0.4,
        });
        gsap.to('.play', {
          ease: 'linear',
          opacity: 0,
        });
      } else {
        video.play();
        isPlaying = true;
        gsap.to('.cursor--body', {
          ease: 'linear',
          opacity: 0,
        });
        gsap.to('.pause', {
          ease: 'linear',
          opacity: 0,
        });
        gsap.to('.play', {
          ease: 'linear',
          opacity: 1,
          delay: 0.4,
        });
      }
    });
  }

  // transform the innerCursor to the current mouse position
  // use requestAnimationFrame() for smooth performance
  const render = () => {
    gsap.to('.cursor', {
      ease: 'linear',
      opacity: 1,
    });
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
