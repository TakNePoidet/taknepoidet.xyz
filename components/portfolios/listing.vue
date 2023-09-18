<script setup lang="ts">
import { PropType } from 'vue';

import Portfolio from '~/components/portfolios/portfolio.vue';
import { ModelPortfolio } from '~/stores/portfolio';

defineProps({
	items: {
		type: Array as PropType<ModelPortfolio[]>,
		required: true
	}
});
</script>

<template>
	<div class="portfolio-listing">
		<template v-for="(item, index) in items" :key="item._id">
			<portfolio :article="item" />
			<hr v-if="index < items.length - 1" />
		</template>
	</div>
</template>

<style scoped lang="scss">
@use 'assets/style/utility';
@use 'assets/style/breakpoints';

.portfolio-listing {
	display: flex;
	flex-direction: column;
	gap: #{utility.rem(16)};

	hr {
		height: 1px;
		border: 0;
		background-color: var(--lighter-fill);
	}

	@include breakpoints.media-down('xl') {
		gap: #{utility.rem(12)};
	}
}
</style>
