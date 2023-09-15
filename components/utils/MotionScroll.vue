<script setup lang="ts">
import { templateRef } from '#imports';

const { keyframes } = defineProps({
	keyframes: {
		type: Object as PropType<MotionKeyframesDefinition>,
		default() {
			return { opacity: [0, 1], y: [0, 0], scale: [0.9, 1], filter: ['blur(20px)', 'blur(0px)'] };
		}
	}
});
const $root = templateRef<HTMLElement>('$root');
import { animate, scroll } from 'motion';
import { onMounted } from '#imports';
import { PropType } from 'vue';
import type { MotionKeyframesDefinition } from '@motionone/dom';

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
