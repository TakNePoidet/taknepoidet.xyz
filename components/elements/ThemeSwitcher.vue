<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useBodyScrollLock, useColorMode, useNamespace, watch } from '#imports';

const $colorMode = useColorMode();
const isDark = computed(() => $colorMode.value === 'dark');

const { unlock, lock } = useBodyScrollLock();

function setPreference(value: string, event?: MouseEvent) {
	const x = event?.clientX ?? window.screen.availWidth / 2;
	const y = event?.clientY ?? window.screen.availHeight / 2;
	const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
	const query = window.matchMedia('(prefers-color-scheme: dark)');
	const system = query.matches ? 'dark' : 'light';
	const isSwitch = (() => {
		if (value === 'system') {
			return $colorMode.value !== system;
		} else {
			return $colorMode.value !== value;
		}
	})();

	if (!isSwitch) {
		$colorMode.preference = value;
		return undefined;
	}
	// @ts-expect-error: Transition API
	const transition = document.startViewTransition(async () => {
		$colorMode.preference = value;
		await nextTick();
	});

	lock();
	transition.ready.then(() => {
		const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
		document.documentElement
			.animate(
				{
					overflow: 'hidden',
					clipPath: isDark.value ? [...clipPath].reverse() : clipPath
				},
				{
					duration: 400,
					easing: 'ease-in',
					pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)'
				}
			)
			.finished.then(() => {
				unlock();
			});
	});
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
</script>

<template>
	<section :class="[base()]" v-bind="$attrs">
		<button
			v-for="{ value, title } in items"
			:key="value"
			type="button"
			:value="value"
			:aria-pressed="active === value"
			@click="setPreference(value, $event)"
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
</style>
