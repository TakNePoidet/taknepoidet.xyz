<script setup lang="ts">
import { animate, scroll } from 'motion';
import type { DOMKeyframesDefinition } from 'motion-dom';
import type { PropType } from 'vue';

import { onMounted, templateRef, useReducedMotion } from '#imports';

const { keyframes } = defineProps({
	keyframes: {
		type: Object as PropType<DOMKeyframesDefinition>,
		default() {
			return { opacity: [0, 1], y: [0, 0], scale: [0.9, 1], filter: ['blur(20px)', 'blur(0px)'] };
		}
	}
});
const $root = templateRef<HTMLElement>('$root');
const reducedMotion = useReducedMotion();

onMounted(() => {
	// Without the animation the element keeps its natural styles, so opting out
	// simply leaves the content visible.
	if ($root.value && !reducedMotion.value) {
		scroll(animate($root.value, keyframes), {
			target: $root.value,
			offset: ['0vh 100vh', '40vh 100vh']
		});
	}
});
</script>

<template>
	<div ref="$root">
		<slot />
	</div>
</template>
