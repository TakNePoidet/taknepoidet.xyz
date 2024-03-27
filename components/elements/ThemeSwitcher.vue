<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useColorMode, useNamespace, watch } from '#imports';

const $colorMode = useColorMode();

function setPreference(value: string) {
	$colorMode.preference = value;
}

const items = computed(() => [
	{
		value: 'light',
		title: 'Люмос'
	},
	{
		value: 'system',
		title: 'Авто'
	},
	{
		value: 'dark',
		title: 'Нокс'
	}
]);

const active = ref('');

const { component, base } = useNamespace('theme-switcher');

onMounted(() => {
	if (process.client) {
		nextTick(() => (active.value = $colorMode.preference));
	}
});

watch(
	() => $colorMode.preference,
	(value) => (active.value = value)
);
watch(
	() => $colorMode.value,
	() => {
		if (process.client) {
			document.documentElement.classList.add('theme-change-animation');
			setTimeout(() => {
				document.documentElement.classList.remove('theme-change-animation');
			}, 200);
		}
	}
);
</script>

<template>
	<section :class="[base()]" v-bind="$attrs">
		<button
			v-for="{ value, title } in items"
			:key="value"
			type="button"
			:value="value"
			:aria-pressed="active === value"
			@click="setPreference(value)"
		>
			{{ title }}
		</button>
		<div :class="[component('indicator')]" />
	</section>
</template>

<style scoped lang="scss">
@use 'assets/style/utility';
@use 'assets/style/breakpoints';

.theme-switcher {
	position: relative;
	display: inline-grid;
	grid-template-columns: repeat(3, 1fr);
	height: #{utility.rem(64)};
	padding: #{utility.rem(4)};
	border: #{utility.rem(2)} solid var(--primary-text);
	border-radius: #{utility.rem(32)};

	button {
		position: relative;
		z-index: 1;
		padding: 0 #{utility.rem(16)};
		border: none;
		border-radius: #{utility.rem(32)};
		background-color: transparent;
		color: var(--primary-text);
		font-weight: 400;
		font-size: #{utility.rem(32)};
		font-family: inherit;
		line-height: 130%;
		text-align: center;
		appearance: none;

		&[aria-pressed='true'] {
			color: var(--brand-color-invert);
			pointer-events: none;
			transition:
				color var(--transition-animation),
				background-color var(--transition-animation);
		}

		@media (hover: hover) {
			&:not([aria-pressed='true']):hover,
			&:not([aria-pressed='true']):focus-visible {
				background-color: var(--light-fill);
				cursor: pointer;
			}
		}
	}

	& &__indicator {
		content: '';
		position: absolute;
		inset: #{utility.rem(4)};
		display: block;
		border-radius: #{utility.rem(32)};
		background-color: var(--brand-color);
		opacity: 0;
		transition:
			left var(--transition-animation),
			width var(--transition-animation);
	}

	button[value='light'][aria-pressed='true'] ~ &__indicator,
	button[value='system'][aria-pressed='true'] ~ &__indicator,
	button[value='dark'][aria-pressed='true'] ~ &__indicator {
		width: calc((100% - #{utility.rem(4 * 2)}) / 3);
		opacity: 1;
	}

	button[value='system'][aria-pressed='true'] ~ &__indicator {
		left: calc(#{utility.rem(4)} + (100% - #{utility.rem(4 * 2)}) / 3);
	}

	button[value='dark'][aria-pressed='true'] ~ &__indicator {
		left: calc(#{utility.rem(4)} + (100% - #{utility.rem(4 * 2)}) / 3 * 2);
	}

	@include breakpoints.media-down('xxl') {
		height: auto;

		button {
			padding: #{utility.rem(8)} #{utility.rem(12)};
			font-size: #{utility.rem(24)};
		}
	}

	@include breakpoints.media-down('xl') {
		display: inline-grid;
		width: 100%;
		height: auto;
		padding: #{utility.rem(2)};
		border-width: #{utility.rem(1)};

		button {
			padding: #{utility.rem(6)} #{utility.rem(12)};
			font-size: #{utility.rem(20)};
		}

		& &__indicator {
			inset: #{utility.rem(2)};
		}

		button[value='system'][aria-pressed='true'] ~ &__indicator {
			left: calc(#{utility.rem(2)} + (100% - #{utility.rem(2 * 2)}) / 3);
		}

		button[value='dark'][aria-pressed='true'] ~ &__indicator {
			left: calc(#{utility.rem(2)} + (100% - #{utility.rem(2 * 2)}) / 3 * 2);
		}
	}
}

html.theme-change-animation * {
	transition: all var(--transition-animation);
}
</style>
