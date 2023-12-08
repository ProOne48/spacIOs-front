import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const slideInBounceAnimation = trigger('slideInBounce', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate(
      '0.5s ease-in',
      keyframes([
        style({ transform: 'translateX(-100%)', offset: 0 }),
        style({ transform: 'translateX(15px)', offset: 0.4 }),
        style({ transform: 'translateX(0)', offset: 1 })
      ])
    )
  ])
]);

export const slideOutBounceAnimation = trigger('slideOutBounce', [
  transition(':leave', [
    animate(
      '0.5s ease-out',
      keyframes([
        style({ transform: 'translateX(0)', offset: 0 }),
        style({ transform: 'translateX(-15px)', offset: 0.4 }),
        style({ transform: 'translateX(-100%)', offset: 1 })
      ])
    )
  ])
]);

export const slideInUpwardsAnimation = trigger('slideInUpwards', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }),
    animate(
      '0.5s ease-in',
      keyframes([
        style({ transform: 'translateY(-100%)', offset: 0 }),
        style({ transform: 'translateY(0)', offset: 1 })
      ])
    )
  ])
]);

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(
      '0.5s ease-in',
      keyframes([
        style({ opacity: 0, offset: 0 }),
        style({ opacity: 0.5, offset: 0.4 }),
        style({ opacity: 1, offset: 1 })
      ])
    )
  ])
]);

export const fadeOutAnimation = trigger('fadeOut', [
  transition(':leave', [
    animate(
      '0.5s ease-out',
      keyframes([
        style({ opacity: 1, offset: 0 }),
        style({ opacity: 0.5, offset: 0.4 }),
        style({ opacity: 0, offset: 1 })
      ])
    )
  ])
]);
