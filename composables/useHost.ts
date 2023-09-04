import { computed, useSiteConfig } from '#imports';

export function useHost() {
	const config = useSiteConfig();
	return computed(() => config.url);
}
