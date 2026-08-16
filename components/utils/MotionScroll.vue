<script setup lang="ts">
import { animate, scroll } from 'motion';
import type { DOMKeyframesDefinition } from 'motion-dom';
import type { PropType } from 'vue';

import { onMounted, templateRef } from '#imports';

const { keyframes } = defineProps({
	keyframes: {
		type: Object as PropType<DOMKeyframesDefinition>,
		default() {
			return { opacity: [0, 1], y: [0, 0], scale: [0.9, 1], filter: ['blur(20px)', 'blur(0px)'] };
		}
	}
});
const $root = templateRef<HTMLElement>('$root');

onMounted(() => {
	if ($root.value) {
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
