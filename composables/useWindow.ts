import { computed } from '#imports';

export function useWindow() {
	return computed(() => (import.meta.client ? window : null));
}
