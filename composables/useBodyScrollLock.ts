import { useEventListener } from '@vueuse/core';
import { computed } from 'vue';

import { useSignal } from '~/composables/useSignal';

let stack = 0;
let scrollPosition = 0;

export function useBodyScrollLock() {
	const [isLocked, setIsLocked] = useSignal(false);

	const scrollbarWidth = computed(() => window.innerWidth - document.documentElement.clientWidth);

	if (typeof window !== 'undefined') {
		useEventListener(window, 'resize', () => {
			document.documentElement.style.setProperty('--height', `${window.innerHeight}px`);
		});
	}

	function lock() {
		stack += 1;
		if (stack === 1) {
			setIsLocked(true);
			scrollPosition = window.scrollY;
			document.documentElement.style.setProperty('--height', `${window.innerHeight}px`);
			document.body.style.setProperty('--scroll-width-offset', `${scrollbarWidth.value}px`);
			document.body.style.setProperty('--overlay-scroll-position', `${-scrollPosition}px`);
			document.documentElement.classList.add('overflow-hidden');
		}
	}

	function active() {
		stack -= 1;
		if (stack < 0) {
			stack = 0;
		}

		if (stack < 1) {
			document.body.style.removeProperty('--overlay-scroll-position');
			document.body.style.setProperty('--scroll-width-offset', `${0}px`);
			document.body.style.setProperty('--overlay-blur', `${0}px`);
			document.documentElement.classList.remove('overflow-hidden');
			window.scrollTo(0, scrollPosition);
			setIsLocked(false);
		}
	}

	return {
		lock,
		active
	};
}
