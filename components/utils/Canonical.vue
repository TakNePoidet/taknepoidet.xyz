<script setup lang="ts">
import type { PropType } from 'vue';

import { useResponseHeader } from '#imports';

const props = defineProps({
	canonical: {
		type: String as PropType<string>,
		required: true
	}
});

if (import.meta.server && props.canonical) {
	useResponseHeader('Link').value = `<${props.canonical}>; rel="canonical"`;
}
</script>

<template>
	<Head>
		<Link rel="canonical" :href="canonical" />
		<Meta property="canonical" :content="canonical" />
		<Meta property="og:url" :content="canonical" />
	</Head>
</template>
