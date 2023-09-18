import type { RouterOptions } from '@nuxt/schema';

import { useNuxtApp } from '#imports';
import { Page } from '~/utils/page';

export default <RouterOptions>{
	routes(_routes) {
		return [
			..._routes,
			{
				name: Page.PortfolioListingTag,
				path: '/portfolio/:tag([a-z-]+)',
				component: () => import('~/pages/portfolio.vue')
			}
		];
	},
	scrollBehavior(to, from, savedPosition) {
		const nuxtApp = useNuxtApp();

		if (to.meta.name !== from.meta.name) {
			return new Promise((resolve) => {
				nuxtApp.hooks.hookOnce('page:finish', () => {
					setTimeout(() => {
						const $header = document.getElementById('header');
						const { height } = $header!.getBoundingClientRect();

						if (to.hash || savedPosition) {
							if (to.hash) {
								resolve({
									el: to.hash,
									left: 0,
									top: height,
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
