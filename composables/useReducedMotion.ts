import { useMediaQuery } from '#imports';

/**
 * Tracks the user's "reduce motion" system setting. Scroll-linked reveals and the
 * theme switcher's circular reveal opt out of animating when this is true.
 */
export function useReducedMotion() {
	return useMediaQuery('(prefers-reduced-motion: reduce)');
}
