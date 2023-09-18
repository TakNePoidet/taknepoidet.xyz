<script setup lang="ts">
import { templateRef, useToggle } from '@vueuse/core';

import { useFocusTrap, watch } from '#imports';
import BaseLogo from '~/components/BaseLogo.vue';
import BaseIcon from '~/components/elements/BaseIcon.vue';
import ThemeSwitcher from '~/components/elements/ThemeSwitcher.vue';
import SrOnly from '~/components/utils/SrOnly.vue';
import { useNamespace } from '~/composables/useNamespace';
import { useSignal } from '~/composables/useSignal';

const ns = useNamespace('header');
const [isOpen, setIsOpen] = useSignal(false);

const toggle = useToggle(isOpen);

const $el = templateRef<HTMLElement>('$el');
const { deactivate, activate } = useFocusTrap($el, {
	escapeDeactivates() {
		setIsOpen(false);
		return false;
	},
	clickOutsideDeactivates() {
		setIsOpen(false);
		return false;
	}
});

watch(isOpen, (value) => {
	if (value) {
		activate();
	} else {
		deactivate();
	}
});
</script>

<template>
	<header id="header" ref="$el" :class="[ns.base(), ns.is('open', isOpen)]">
		<div :class="[ns.component('container')]">
			<div :class="[ns.component('controller')]">
				<button type="button" :class="[ns.component('bar')]" @click.stop="toggle()">
					<base-icon name="bar" style="width: 44px" />
					<sr-only>Меню</sr-only>
				</button>
				<nuxt-link href="/" :class="[ns.component('logo')]">
					<base-logo />
					<sr-only>TakNePoidet</sr-only>
				</nuxt-link>
			</div>
			<div :class="[ns.component('content')]">
				<theme-switcher :class="[ns.component('theme')]" />
			</div>
		</div>
	</header>
</template>

<style scoped lang="scss">
@use 'assets/style/utility';
@use 'assets/style/breakpoints';

.header {
	$self: &;

	position: sticky;
	top: 0;
	z-index: 10;
	margin: #{utility.rem(16)} calc(var(--ears) * -1);
	padding: 0 var(--ears);
	background-color: var(--blank-fill--о90);
	backdrop-filter: blur(10px);

	> canvas {
		z-index: -1;
	}

	& &__bar {
		display: flex;
		justify-content: center;
		align-items: center;
		width: #{utility.rem(32)};
		height: #{utility.rem(32)};
		margin: 0;
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--primary-text);
		appearance: none;

		.icon {
			width: #{utility.rem(32)};
			height: #{utility.rem(32)};
		}

		@include breakpoints.media-up('xl') {
			display: none;
		}
	}

	& &__container {
		display: flex;
		justify-content: space-between;
		width: min(100%, var(--container));
		margin: 0 auto;
		padding: #{utility.rem(16)} 0;
	}

	& &__logo {
		.logo {
			display: block;
			height: #{utility.rem(64)};
		}
	}

	@include breakpoints.media-down('xl') {
		& &__container {
			margin: #{utility.rem(12)} auto;
			padding: #{utility.rem(12)} 0;
		}

		& &__logo {
			.logo {
				height: #{utility.rem(48)};
			}
		}
	}

	@include breakpoints.media-down('xl') {
		///height: var(--height);
		margin-top: 0;
		margin-bottom: 0;

		& &__container {
			display: grid;
			grid-template-columns: 1fr;
			gap: #{utility.rem(16)};
		}

		& &__controller {
			display: flex;
			gap: #{utility.rem(12)};
			justify-content: flex-start;
			align-items: center;
		}

		& &__content {
			display: none;
			visibility: hidden;
		}
	}

	&#{$self}--is-open {
		#{$self}__content {
			display: flex;
			justify-content: center;
			visibility: visible;
		}
		#{$self}__theme {
			flex: 1;
		}
	}
}
</style>
