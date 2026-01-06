import gsap from 'gsap';

export const productCardHoverAnimation = (
  element: HTMLElement,
  imageElement: HTMLElement
) => {
  const tl = gsap.timeline({ paused: true });

  tl.to(imageElement, {
    y: -10,
    duration: 0.3,
    ease: 'power2.out',
  });

  return {
    play: () => tl.play(),
    reverse: () => tl.reverse(),
  };
};

export const pageTransition = {
  fadeIn: (element: HTMLElement) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  },
};