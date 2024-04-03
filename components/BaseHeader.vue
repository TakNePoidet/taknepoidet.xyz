<script setup lang="ts">
import { templateRef, useToggle } from '@vueuse/core';

import { useBodyScrollLock, useFocusTrap, useRoute, useWindowSize, watch } from '#imports';
import BaseLogo from '~/components/BaseLogo.vue';
import BaseIcon from '~/components/elements/BaseIcon.vue';
import ThemeSwitcher from '~/components/elements/ThemeSwitcher.vue';
import SrOnly from '~/components/utils/SrOnly.vue';
import { useNamespace } from '~/composables/useNamespace';
import { useSignal } from '~/composables/useSignal';

const { active, lock } = useBodyScrollLock();
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
		lock();
	} else {
		deactivate();
		active();
	}
});

function close() {
	isOpen.value = false;
}
watch(useWindowSize().width, (value, oldValue) => {
	if (value >= 1360 && oldValue < 1360) {
		close();
	}
});

function scrollTop() {
	if (!process.client) {
		return undefined;
	}
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
}

const route = useRoute();
function action() {
	if (route.path === '/') {
		setTimeout(() => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		}, 0);
	}
}
</script>

<template>
	<header id="header" ref="$el" :class="[ns.base(), ns.is('open', isOpen)]">
		<button class="header__action" tabindex="-1" @click="scrollTop"></button>
		<div :class="[ns.component('container')]">
			<div :class="[ns.component('controller')]">
				<button type="button" :class="[ns.component('bar')]" @click.stop="toggle()">
					<base-icon name="bar" style="width: 44px" />
					<sr-only>Меню</sr-only>
				</button>
				<nuxt-link href="/" :class="[ns.component('logo')]" @click="action">
					<base-logo />
					<sr-only>TakNePoidet</sr-only>
				</nuxt-link>
			</div>
			<div :class="[ns.component('content')]">
				<nav :class="ns.component('navigation')">
					<ul>
						<li>
							<nuxt-link href="/#about" @click="close">Обо мне</nuxt-link>
						</li>
						<li>
							<nuxt-link href="/#portfolio" @click="close">Портфолио</nuxt-link>
						</li>
						<li>
							<nuxt-link href="/#inventory" @click="close">Инвентарь</nuxt-link>
						</li>
					</ul>
				</nav>
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

	& &__action {
		position: absolute;
		inset: 0;
		padding: 0;
		opacity: 0;

		//appearance: none;
	}

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
		position: relative;
		z-index: 1;
		display: block;

		.logo {
			display: block;
			height: #{utility.rem(64)};
		}
	}

	& &__content {
		display: flex;
		gap: #{utility.rem(24)};
		align-items: center;
		border-radius: #{utility.rem(16)} #{utility.rem(50)} #{utility.rem(50)} #{utility.rem(16)};
		background-color: var(--blank-fill);
	}

	& &__navigation {
		position: relative;
		z-index: 1;

		ul {
			display: flex;
			gap: #{utility.rem(24)};
			justify-content: flex-end;
			align-items: center;
			margin: 0;
			padding: 0 0 0 #{utility.rem(24)};
			list-style: none;

			li {
				color: var(--primary-text);
				font-weight: 400;
				font-style: normal;
				font-size: #{utility.rem(24)};
				line-height: 130%; /* 31.2px */
				a {
					color: inherit;
					font: inherit;

					&:not(&:hover) {
						text-decoration: none;
					}

					@include utility.has-hover {
						color: var(--brand-color);
					}
				}
			}

			@include breakpoints.media-down('xl') {
				display: grid;
			}
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
			gap: #{utility.rem(8)};
			border-radius: #{utility.rem(32)};
			border-top-left-radius: #{utility.rem(12)};
			border-top-right-radius: #{utility.rem(12)};
			visibility: hidden;
		}

		& &__navigation {
			ul {
				justify-content: flex-start;
				padding: #{utility.rem(16)};

				li {
					font-size: #{utility.rem(20)};
				}
			}
		}
	}

	&#{$self}--is-open {
		#{$self}__content {
			display: grid;
			visibility: visible;
		}

		#{$self}__theme {
			flex: 1;
		}
	}
}
</style>
