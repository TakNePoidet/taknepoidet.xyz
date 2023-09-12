<script setup lang="ts">
import confetti from 'canvas-confetti';
import { throttle } from '~/utils/throttle';
import { useNamespace } from '~/composables/useNamespace';
import BasePicture from '~/components/elements/BasePicture.vue';
import { computed, useState } from '#imports';

const { base, component } = useNamespace('footer');

const count = 200;
const defaults: confetti.Options = {
	origin: { y: 1, x: 0.5 }
};

function fire(ratio: number, opts: confetti.Options) {
	confetti({ ...defaults, ...opts, particleCount: Math.floor(count * ratio) });
}
const memoji = computed(() => ['memoji-like.png', 'memoji-bellissimo.png', 'memoji-call-me.png']);

const active = useState(() => 0);

function next() {
	active.value += 1;
	if (active.value > memoji.value.length - 1) {
		active.value = 0;
	}
}

const show = throttle(() => {
	next();
	fire(0.25, {
		spread: 26,
		startVelocity: 55
	});
	fire(0.2, {
		spread: 60
	});
	fire(0.35, {
		spread: 100,
		decay: 0.91,
		scalar: 0.8
	});
	fire(0.1, {
		spread: 120,
		startVelocity: 25,
		decay: 0.92,
		scalar: 1.2
	});
	fire(0.1, {
		spread: 120,
		startVelocity: 45
	});
}, 1000);
</script>

<template>
	<footer :class="[base()]">
		<div :class="[component('content')]">
			<span>Якин <u>Никита</u></span>
			<button type="button" @click="show">
				<base-picture
					v-for="(item, i) in memoji"
					v-show="active === i"
					:key="i"
					alt="Мемодзи"
					:src="`/images/${item}`"
					:width="256"
					:height="256"
				/>
			</button>
			<span>{{ new Date().getFullYear() }}</span>
		</div>
	</footer>
</template>

<style scoped lang="scss">
@use 'assets/style/utility';
@use 'assets/style/breakpoints';

.footer {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: #{utility.rem(64)};
	color: var(--primary-text);
	font-weight: 500;
	font-size: #{utility.rem(32)};
	line-height: 100%;

	& &__content {
		position: relative;
		display: flex;
		gap: #{utility.rem(32)};
		justify-content: center;
		align-items: center;

		> button {
			margin: 0;
			padding: 0;
			border: 0;
			background: transparent;
			appearance: none;
		}
	}

	span {
		//position: absolute;
		white-space: nowrap;

		&:first-child {
			color: var(--brand-color);
		}
	}

	picture,
	picture :deep(img) {
		display: block;
		width: #{utility.rem(128)};
		height: #{utility.rem(128)};
	}

	@include breakpoints.media-down('xl') {
		padding-top: #{utility.rem(32)};
		font-size: #{utility.rem(20)};

		& &__content {
			gap: #{utility.rem(8)};
		}

		picture,
		picture :deep(img) {
			display: block;
			width: #{utility.rem(100)};
			height: #{utility.rem(100)};
		}
	}
}
</style>
