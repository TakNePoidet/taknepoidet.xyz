<script setup lang="ts">
import { useNamespace } from '~/composables/useNamespace';

const { base } = useNamespace('footer');
</script>

<template>
	<footer :class="[base()]">
		<span>Якин Никита</span>
		<nuxt-picture src="/images/memoji.png" :width="256" :height="256" />
		{{ new Date().getFullYear() }}
	</footer>
</template>

<style lang="scss">
@use 'assets/style/utility';

.footer {
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: #{utility.rem(64)};
	color: var(--primary-text);
	font-weight: 500;
	font-size: #{utility.rem(32)};
	line-height: 100%;

	span {
		color: var(--brand-color);
	}

	picture,
	picture img {
		display: block;
		width: #{utility.rem(128)};
		height: #{utility.rem(128)};
	}

	@media screen and (width <= 1424px) {
		padding-top: #{utility.rem(32)};
		font-size: #{utility.rem(16)};

		picture,
		picture img {
			display: block;
			width: #{utility.rem(64)};
			height: #{utility.rem(64)};
		}
	}
}
</style>
