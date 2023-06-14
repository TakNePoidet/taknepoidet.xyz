<script setup lang="ts">
import TheHeader from '~/components/TheHeader.vue';
import TheFooter from '~/components/TheFooter.vue';
</script>

<template>
	<the-header />
	<main>
		<nuxt-page />
	</main>
	<the-footer />
</template>

<style lang="scss">
/* stylelint-disable-next-line selector-id-pattern */
#__nuxt {
	display: flex;
	flex-direction: column;
	align-content: stretch;
	justify-content: flex-start;
	min-height: 100%;

	main {
		flex: 1;
	}
}
</style>
