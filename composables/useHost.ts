import { computed, useNuxtApp } from '#imports';

export function useHost() {
	const nuxtApp = useNuxtApp();

	return computed(() => {
		if (process.server) {
			if (process.dev) {
				return `http://${nuxtApp.ssrContext?.event.node.req.headers.host}`;
			}
			return nuxtApp.ssrContext?.event.node.req.headers.origin ?? import.meta.env.VITE_SITE ?? process.env.VITE_SITE;
		}
		return window.location.origin;
	});
}
