<script setup lang="ts">
import BaseFooter from '~/components/BaseFooter.vue';
import BaseHeader from '~/components/BaseHeader.vue';
</script>

<template>
	<div>
		<base-header />
		<main>
			<nuxt-page />
		</main>
		<base-footer />
	</div>
</template>

<style scoped lang="scss">
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
