<script setup lang="ts">
import { computed, useColorMode, useNamespace, watch } from '#imports';

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

const active = computed(() => $colorMode.preference);

const { component, base } = useNamespace('theme-switcher');

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
	<client-only>
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
	</client-only>
</template>

<style scoped lang="scss">
@use 'assets/style/utility';

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
		transition:
			left var(--transition-animation),
			width var(--transition-animation);
	}

	button[value='light'][aria-pressed='true'] ~ &__indicator,
	button[value='system'][aria-pressed='true'] ~ &__indicator,
	button[value='dark'][aria-pressed='true'] ~ &__indicator {
		width: calc((100% - #{utility.rem(4 * 2)}) / 3);
	}

	button[value='system'][aria-pressed='true'] ~ &__indicator {
		left: calc(#{utility.rem(4)} + (100% - #{utility.rem(4 * 2)}) / 3);
	}

	button[value='dark'][aria-pressed='true'] ~ &__indicator {
		left: calc(#{utility.rem(4)} + (100% - #{utility.rem(4 * 2)}) / 3 * 2);
	}

	@media screen and (width <= 1424px) {
		display: inline-grid;
		height: #{utility.rem(32)};
		padding: #{utility.rem(2)};
		border-width: #{utility.rem(1)};

		button {
			padding: 0 #{utility.rem(4)};
			font-size: #{utility.rem(16)};
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
