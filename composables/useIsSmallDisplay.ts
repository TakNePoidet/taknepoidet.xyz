import { useMediaQuery } from '@vueuse/core';

export function useIsSmallDisplay() {
	return useMediaQuery('(width <= 1424px)');
}
