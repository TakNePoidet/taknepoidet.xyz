<script setup lang="ts">
import BaseFooter from '~/components/BaseFooter.vue';
import BaseHeader from '~/components/BaseHeader.vue';
</script>

<template>
	<div>
		<Body class="default-layout" />
		<base-header />
		<main>
			<nuxt-page />
		</main>
		<base-footer />
	</div>
</template>

<style lang="scss">
body.default-layout {
	padding: 0 var(--ears);
}
</style>
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
