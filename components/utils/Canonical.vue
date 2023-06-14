<script setup lang="ts">
import { PropType } from 'vue/dist/vue';
import { setResponseHeaders } from 'h3';
import { useRequestEvent } from '#imports';

const props = defineProps({
	canonical: {
		type: String as PropType<string>,
		required: true
	}
});

if (!process.client && props.canonical) {
	const event = useRequestEvent();

	setResponseHeaders(event, {
		Link: `<${props.canonical}>; rel="canonical"`
	});
}
</script>

<template>
	<Head>
		<Link rel="canonical" :href="canonical" />
		<Meta property="canonical" :content="canonical" />
		<Meta property="og:url" :content="canonical" />
	</Head>
</template>
