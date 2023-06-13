<script setup lang="ts">
import { useNamespace } from '~/composables/useNamespace';
import TheLogo from '~/components/TheLogo.vue';

const ns = useNamespace('header');
</script>

<template>
	<header :class="[ns.base()]">
		<div :class="[ns.component('container')]">
			<nuxt-link href="/" :class="[ns.component('logo')]">
				<the-logo />
			</nuxt-link>
		</div>
	</header>
</template>

<style lang="scss">
@use 'assets/style/utility';

.header {
	position: sticky;
	top: 0;
	z-index: 10;
	background-color: var(--blank-fill--о90);
	backdrop-filter: blur(10px) grayscale(100%);

	& &__container {
		width: min(100%, var(--container));
		margin: #{utility.rem(16)} auto;
		padding: #{utility.rem(16)} 0;
	}

	& &__logo {
		.logo {
			height: #{utility.rem(64)};
		}
	}

	@media screen and (width <= 1424px) {
		& &__container {
			padding: #{utility.rem(8)} #{utility.rem(16)};
		}

		& &__logo {
			.logo {
				height: #{utility.rem(32)};
			}
		}
	}
}
</style>
