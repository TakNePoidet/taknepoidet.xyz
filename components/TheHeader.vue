<script setup lang="ts">
import { templateRef, useToggle } from '@vueuse/core';
import { useSignal } from '~/composables/useSignal';
import { useNamespace } from '~/composables/useNamespace';
import SrOnly from '~/components/utils/SrOnly.vue';
import { Icon24Bar } from '~/components/ui/icons';
import TheThemeSwitcher from '~/components/TheThemeSwitcher.vue';
import TheLogo from '~/components/TheLogo.vue';
import TheIcon from '~/components/elements/TheIcon.vue';
import { useFocusTrap, watch } from '#imports';

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
	<header ref="$el" :class="[ns.base(), ns.is('open', isOpen)]">
		<div :class="[ns.component('container')]">
			<div :class="[ns.component('controller')]">
				<button type="button" :class="[ns.component('bar')]" @click.stop="toggle()">
					<the-icon :icon="Icon24Bar" style="width: 44px" />
					<sr-only>Меню</sr-only>
				</button>
				<nuxt-link href="/" :class="[ns.component('logo')]">
					<the-logo />
					<sr-only>TakNePoidet</sr-only>
				</nuxt-link>
			</div>
			<div :class="[ns.component('content')]">
				<the-theme-switcher :class="[ns.component('theme')]" />
			</div>
		</div>
	</header>
</template>

<style lang="scss">
@use 'assets/style/utility';

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
			width: #{utility.rem(24)};
			height: #{utility.rem(24)};
		}

		@media screen and (width > 1424px) {
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

	@media screen and (width <= 1424px) {
		& &__container {
			margin: #{utility.rem(8)} auto;
			padding: #{utility.rem(8)} 0;
		}

		& &__logo {
			.logo {
				height: #{utility.rem(32)};
			}
		}
	}

	@media screen and (width <= 1424px) {
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
			gap: #{utility.rem(4)};
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
