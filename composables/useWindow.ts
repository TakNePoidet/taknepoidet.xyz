import { computed } from '#imports';

export function useWindow() {
	return computed(() => (process.client ? window : null));
}
