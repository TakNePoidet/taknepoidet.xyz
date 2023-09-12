<script setup lang="ts"></script>

<template>
	<div class="page">
		<slot />
	</div>
</template>

<style scoped lang="scss">
@use 'assets/style/utility';
@use 'assets/style/breakpoints';

.page {
	display: grid;
	gap: #{utility.rem(128)};
	overflow-x: hidden;
	margin: #{utility.rem(16)} calc(var(--ears) * -1);
	padding: 0 var(--ears);

	@include breakpoints.media-down('xl') {
		gap: #{utility.rem(64)};
	}
}
</style>
