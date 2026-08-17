<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
	/** Strength of the grain, in percent. */
	opacity: {
		type: Number as PropType<number>,
		default() {
			return 4;
		}
	}
});
</script>

<template>
	<div class="noisy" aria-hidden="true" :style="{ '--noisy-opacity': `${opacity}%` }" />
</template>

<style scoped lang="scss">
/*
 * A fixed film-grain layer. Rendered as a tiled SVG turbulence rather than a
 * canvas full of random pixels: no per-pixel JS, no repaint on resize, and it
 * stays a single composited layer. `overlay` blending makes it darken the light
 * theme and lighten the dark one from the same tile.
 */
.noisy {
	position: fixed;
	inset: 0;
	z-index: 9999;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
	background-size: #{180px} #{180px};
	background-repeat: repeat;
	opacity: var(--noisy-opacity);
	mix-blend-mode: overlay;
	pointer-events: none;
}
</style>
