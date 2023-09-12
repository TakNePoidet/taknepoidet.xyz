<script setup lang="ts">
import type { PropType } from 'vue';
import { useNamespace } from '~/composables/useNamespace';

defineProps({
	title: {
		type: String as PropType<string>,
		default: undefined
	},
	titleTag: {
		type: String as PropType<keyof HTMLElementTagNameMap>,
		default() {
			return 'h2';
		}
	},
	badge: {
		type: [String, Number] as PropType<string | number>,
		default: undefined
	}
});
const { base, component } = useNamespace('section');
</script>

<template>
	<section :class="[base()]" v-bind="$attrs">
		<div :class="[component('container')]">
			<component :is="titleTag" v-if="title" :class="[component('title')]">
				{{ title }}
				<sup v-if="badge">{{ badge }}</sup>
			</component>

			<div :class="[component('content')]">
				<slot />
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
@use 'assets/style/utility';
@use 'assets/style/breakpoints';

.section {
	& &__container {
		width: min(100%, var(--container));
		margin: 0 auto;
	}

	& &__title {
		margin-bottom: #{utility.rem(64)};
		color: var(--primary-text);
		font-weight: 700;
		font-size: #{utility.rem(64)};
		line-height: 100%;
		text-align: center;
		text-wrap: balance;
		overflow-wrap: break-word;

		sup {
			vertical-align: super;
			color: var(--brand-color);
			font-weight: 600;
			font-size: 0.6em;
		}
	}

	@include breakpoints.media-down('xl') {
		& &__title {
			margin-bottom: #{utility.rem(32)};
			font-size: #{utility.rem(32)};
		}
	}
}
</style>
