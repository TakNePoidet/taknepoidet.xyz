import type { UnwrapRef } from 'vue';
import { ref } from '#imports';

export function useSignal<T>(init: T) {
	const state = ref(init);

	function setState(value: UnwrapRef<T>): void {
		state.value = value;
	}
	return [state, setState] as const;
}
