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

	@include breakpoints.media-down('xl') {
		gap: #{utility.rem(64)};
	}
}
</style>
