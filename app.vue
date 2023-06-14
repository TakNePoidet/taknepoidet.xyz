<script lang="ts" setup>
import { useEventListener } from '@vueuse/core';
import { useWindow } from '~/composables/useWindow';

const appHeight = () => {
	const doc = document.documentElement;

	doc.style.setProperty('--height', `${window.innerHeight}px`);
};
const $windows = useWindow();

useEventListener($windows, 'resize', appHeight);
if (process.client) {
	appHeight();
}
</script>
<template>
	<Html lang="ru" />
	<Link rel="manifest" href="/manifest.webmanifest" />
	<Link rel="icon" href="/favicon.ico" sizes="any" />
	<Link rel="icon" href="/icon.svg" type="image/svg+xml" />
	<Link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<Meta name="viewport" content="width=device-width, initial-scale=1" />
	<nuxt-layout />
</template>
