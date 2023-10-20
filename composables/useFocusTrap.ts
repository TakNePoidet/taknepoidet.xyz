import type { FocusTrap } from 'focus-trap';
import * as focusTrap from 'focus-trap';
import type { Ref } from 'vue';
import { ref, watch } from 'vue';

import { onBeforeUnmount, onMounted } from '#imports'; // ESM

export function useFocusTrap($el: Ref<HTMLElement | null>, options: focusTrap.Options = {}) {
	const trap: Ref<FocusTrap | null> = ref(null);

	onMounted(() => {
		if ($el.value) {
			trap.value = focusTrap.createFocusTrap($el.value, options);
		}
	});

	watch($el, () => {
		if ($el.value) {
			trap.value = focusTrap.createFocusTrap($el.value, options);
		}
	});

	function activate() {
		if (trap.value) {
			trap.value.activate();
		}
	}
	function deactivate() {
		if (trap.value) {
			trap.value.deactivate();
		}
	}
	onBeforeUnmount(() => {
		deactivate();
	});

	return { activate, deactivate };
}
