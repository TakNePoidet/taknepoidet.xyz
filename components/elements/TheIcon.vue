<template>
	<component :is="icon" v-if="name" :class="['icon', 'icon--' + name]" />
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { Icon } from '~/components/ui/icons';
import { computed } from '#imports';

const props = defineProps({
	icon: {
		type: Object as PropType<Icon>,
		required: true
	}
});

const name = computed(() => props.icon?.name ?? undefined);
</script>

<style scoped lang="scss">
.icon {
	display: inline-block;
	color: currentcolor;
}
</style>
