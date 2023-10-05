<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
	name: {
		type: String as PropType<
			| 'bar'
			| 'mysql'
			| 'laravel'
			| 'php'
			| 'scss'
			| 'css'
			| 'html'
			| 'javascript'
			| 'typescript'
			| 'nuxt'
			| 'vue'
			| 'telegram'
			| 'phone'
			| 'email'
			| 'instagram'
			| 'github'
			| 'whatsapp'
			| 'vk'
			| 'www'
			| 'link'
			| 'arrow-badge-up'
			| 'arrow-badge-down'
			| string
		>,
		required: true
	}
});
</script>

<template>
	<svg-icon :class="`icon icon--${name}`" :name="name" />
</template>

<style scoped>
.icon {
	width: 32px;
	aspect-ratio: 1 /1;
}
</style>
