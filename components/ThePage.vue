<script setup lang="ts"></script>

<template>
	<div class="page">
		<slot />
	</div>
</template>

<style scoped lang="scss">
@use 'assets/style/utility';

.page {
	display: grid;
	gap: #{utility.rem(128)};

	@media screen and (width <= 1424px) {
		gap: #{utility.rem(64)};
	}
}
</style>
