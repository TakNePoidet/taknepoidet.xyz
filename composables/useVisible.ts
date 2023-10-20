import type { Ref } from 'vue';

import { readonly, ref, useIntersectionObserver, watch } from '#imports';

interface Params {
	once: boolean;
}

export function useVisible($el: Ref<HTMLElement | null>, params: Partial<Params> = {}) {
	const visible = ref<boolean>(false);
	const { stop, isSupported } = useIntersectionObserver($el, ([{ isIntersecting }]) => {
		if (params.once === true) {
			if (isIntersecting) {
				visible.value = isIntersecting;
			}
		} else {
			visible.value = isIntersecting;
		}
	});

	if (!isSupported) {
		visible.value = true;
	}
	watch(visible, () => {
		if (visible.value === true && params.once) {
			stop();
		}
	});
	return readonly(visible);
}
