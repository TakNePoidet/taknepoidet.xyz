<template>
	<Head>
		<Title>{{ title }}</Title>
		<Meta name="title" :content="title" />
		<Meta property="og:title" :content="title" />
		<Meta property="twitter:title" :content="title" />

		<template v-if="description">
			<Meta name="description" :content="description" />
			<Meta property="og:description" :content="description" />
			<Meta property="twitter:description" :content="description" />
		</template>

		<template v-if="cover">
			<Meta property="twitter:card" content="summary_large_image" />
			<Meta property="twitter:image" :content="cover" />
			<Meta property="og:image" :content="cover" />
			<Meta property="vk:image" :content="cover" />
		</template>
		<template v-if="canonical">
			<canonical :canonical="canonical" />
		</template>
	</Head>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';

import Canonical from '~/components/utils/Canonical.vue';

const props = defineProps({
	title: {
		type: String as PropType<string>,
		required: true
	},
	description: {
		type: String as PropType<string>,
		required: false,
		default: undefined
	},
	cover: {
		type: String as PropType<string>,
		required: false,
		default: undefined
	},
	canonical: {
		type: String as PropType<string>,
		required: false,
		default: undefined
	},
	template: {
		type: Boolean as PropType<boolean>,
		required: false,
		default: true
	}
});

const title = computed(() => {
	if (props.template) {
		return `${props.title} | TakNePoidet`;
	}
	return props.title ?? 'Якин Никита | TakNePoidet';
});
</script>
