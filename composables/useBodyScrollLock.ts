import { useEventListener } from '@vueuse/core';

import { useSignal } from '~/composables/useSignal';

let stack = 0;

export function useBodyScrollLock() {
	const [, setIsLocked] = useSignal(false);

	if (typeof window !== 'undefined') {
		useEventListener(window, 'resize', () => {
			document.documentElement.style.setProperty('--height', `${window.innerHeight}px`);
		});
	}

	function lock() {
		stack += 1;
		if (stack === 1) {
			setIsLocked(true);
			document.documentElement.classList.add('overflow-hidden');
		}
	}

	function unlock() {
		stack -= 1;
		if (stack < 0) {
			stack = 0;
		}

		if (stack < 1) {
			document.documentElement.classList.remove('overflow-hidden');
			setIsLocked(false);
		}
	}

	return {
		lock,
		unlock
	};
}
