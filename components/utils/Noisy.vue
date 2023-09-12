<script setup lang="ts">
import { PropType } from 'vue';
import { templateRef, useElementBounding } from '@vueuse/core';
import { nextTick, onMounted, onUpdated, useSignal, watch } from '#imports';

defineProps({
	opacity: {
		type: Number as PropType<number>,
		default() {
			return 10;
		}
	}
});

const $canvas = templateRef<HTMLCanvasElement>('$canvas');
const [context, setContext] = useSignal<CanvasRenderingContext2D | null>(null);
const { width, height } = useElementBounding($canvas);

function render(context: CanvasRenderingContext2D) {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	const imageData = context.createImageData(context.canvas.width, context.canvas.height);
	const buffer = new Uint32Array(imageData.data.buffer);

	for (let i = 0; i < buffer.length; i += 1) {
		if (Math.random() < 0.5) {
			buffer[i] = 0xffffffff;
		}
	}
	context.putImageData(imageData, 0, 0);
}

watch(context, (value) => {
	if (value) {
		value.canvas.width = width.value;
		value.canvas.height = height.value;
		render(value);
	}
});
onMounted(async () => {
	await nextTick();
	if ($canvas.value) {
		setContext($canvas.value.getContext('2d'));
	}
});
onUpdated(async () => {
	await nextTick();
	if ($canvas.value && context.value) {
		render(context.value);
	}
});
watch(
	() => [width, height],
	() => {
		if (!context.value || $canvas.value) {
			return;
		}
		render(context.value);
	}
);
</script>

<template>
	<canvas ref="$canvas" class="noisy" :style="{ opacity: opacity + '%' }" />
</template>

<style scoped lang="scss">
canvas {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
}
</style>
