<script setup lang="ts">
import { useNamespace } from '~/composables/useNamespace';

const { base, component } = useNamespace('section');
</script>

<template>
	<section :class="[base()]" v-bind="$attrs">
		<div :class="[component('container')]">
			<div :class="[component('content')]">
				<slot />
			</div>
		</div>
	</section>
	<section></section>
</template>

<style lang="scss">
.section {
	& &__container {
		width: min(100%, var(--container));
		margin: 0 auto;
	}
}
</style>
