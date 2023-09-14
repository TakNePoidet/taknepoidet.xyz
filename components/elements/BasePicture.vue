<template>
	<div :class="[ns.base(), ns.is('loaded', loaded), ns.is('preload', preload)]">
		<picture>
			<source
				v-for="(item, i) in sources"
				:key="i"
				:srcset="item.srcset"
				:type="item.type"
				:sizes="isVisible ? item.sizes : undefined"
			/>

			<img
				ref="$element"
				:src="placeholder"
				:width="width"
				:height="height"
				:alt="alt"
				:data-src="src"
				:data-loading="loaded"
				:loading="preload ? 'eager' : 'lazy'"
				@load="onLoad"
			/>
			<template v-if="preload">
				<Link
					rel="preload"
					as="image"
					:imagesizes="preloadSources.imagesizes"
					:imagesrcset="preloadSources.imagesrcset"
				/>
			</template>
		</picture>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, PropType, readonly, Ref } from 'vue';
import { templateRef } from '@vueuse/core';
import { useSignal } from '~/composables/useSignal';
import { useNuxtImage } from '~/composables/useNuxtImage';
import { computed, nextTick, ref, useNamespace, useVisible, watch } from '#imports';

const props = defineProps({
	src: {
		type: String as PropType<string>,
		required: true
	},
	width: {
		type: Number as PropType<number>,
		required: true,
		default(this: void) {
			throw new Error('Не указана ширина изображения');
		}
	},
	height: {
		type: [Number, String] as PropType<number | string>,
		required: true,
		default(this: void) {
			throw new Error('Не указана высота изображения');
		}
	},
	alt: {
		type: String as PropType<string>,
		required: true,
		default(this: void) {
			throw new Error('Не указано описание изображения');
		}
	},
	preload: {
		type: Boolean as PropType<boolean>,
		required: false,
		default: false
	}
});

function getFileExtension(url: string) {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return url.split(/[?#]/).shift()!.split('/').pop()!.split('.').pop()!;
}

const ns = useNamespace('picture');

const originalFormat = computed(() => getFileExtension(props.src));
const format = computed(() => (originalFormat.value === 'svg' ? 'svg' : 'webp'));

function onLoad() {
	if (isVisible.value) {
		setLoaded(true);
	}
}

const $img = useNuxtImage();
const $element = templateRef<HTMLImageElement>('$element');
const [loaded, setLoaded] = useSignal(false);
let isVisible: Ref<boolean>;

if (props.preload) {
	isVisible = readonly(ref(true));
	setLoaded(true);
} else {
	isVisible = useVisible($element, {
		once: true
	});
}

const placeholder = computed(() =>
	$img(props.src, { quality: 90, width: 100, height: 100, fit: 'cover', format: 'webp' })
);

type Source = { srcset: string; src?: string; type?: string; sizes?: string };
const sources = computed<Source[]>(() => {
	if (format.value === 'svg') {
		return [{ srcset: props.src }];
	}
	const formats = [format.value];

	return formats.map((format) => {
		const { srcset, sizes, src } = $img.getSizes(props.src, {
			sizes: $img.options.screens,
			modifiers: {
				quality: 90,
				format
			}
		});

		return { srcset, sizes, src };
	});
});
const preloadSources = computed(() => {
	const srcKey = sources.value[1] ? 1 : 0;
	const source = sources.value[srcKey];
	const imagesizes = source?.sizes;
	const imagesrcset = source?.srcset;

	return { imagesizes, imagesrcset };
});

function check() {
	nextTick(() => {
		if (isVisible.value && $element.value && $element.value.complete) {
			setLoaded(true);
		}
	});
}

watch(
	() => props.src,
	() => {
		setLoaded(true);
	}
);
onMounted(() => {
	check();
});
watch(isVisible, () => {
	check();
});
</script>
<style scoped lang="scss">
.picture {
	$self: &;

	display: block;
	overflow: hidden;

	img {
		display: block;
	}

	&:not(#{$self}--is-preload) {
		opacity: 0;
		&#{$self}--is-loaded {
			animation: appear 500ms forwards;
		}
	}
}

@keyframes appear {
	0% {
		opacity: 0;
		filter: blur(20px);
		scale: 1.1;
	}

	10% {
		opacity: 1;
		filter: blur(10px);
	}

	100% {
		opacity: 1;
		filter: blur(0);
		scale: 1;
	}
}
</style>
