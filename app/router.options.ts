import type { RouterOptions } from '@nuxt/schema';
import { useNuxtApp } from '#imports';

export default <RouterOptions>{
	scrollBehavior(to, from, savedPosition) {
		const nuxtApp = useNuxtApp();

		if (to.meta.name !== from.meta.name) {
			return new Promise((resolve) => {
				nuxtApp.hooks.hookOnce('page:finish', () => {
					setTimeout(() => {
						if (to.hash || savedPosition) {
							if (to.hash) {
								resolve({
									el: to.hash,
									left: 0,
									behavior: 'smooth'
								});
							} else {
								resolve({ ...savedPosition, behavior: 'smooth' });
							}
						} else {
							resolve({ left: 0, top: 0, behavior: 'smooth' });
						}
					}, 50);
				});
			});
		}
		if (to.hash) {
			return {
				el: to.hash,
				left: 0,
				behavior: 'smooth'
			};
		}
		return {};
	}
};