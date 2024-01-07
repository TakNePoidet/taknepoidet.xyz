<template>
	<div class="picture">
		<picture>
			<source
				v-for="(item, i) in sources"
				:key="i"
				:srcset="isVisible ? item.srcset : undefined"
				:type="item.type"
				:sizes="isVisible ? item.sizes : undefined"
			/>

			<img
				ref="$element"
				:src="placeholder"
				:alt="alt"
				:width="width"
				:height="height"
				:data-src="src"
				:data-sizes="'auto'"
				:loading="preload ? 'eager' : 'lazy'"
				:style="{ aspectRatio: !isVisible ? `${width}/${height}` : undefined }"
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
import { templateRef } from '@vueuse/core';
import { createPlaceholderFromHash } from 'unlazy';
import { type PropType, readonly, type Ref } from 'vue';

import { computed, ref, useVisible } from '#imports';
import { useNuxtImage } from '~/composables/useNuxtImage';

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
		type: Number as PropType<number>,
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
	},
	blurhash: {
		type: String as PropType<string>,
		required: false,
		default: null
	}
});

function getFileExtension(url: string) {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return url.split(/[?#]/).shift()!.split('/').pop()!.split('.').pop()!;
}

const originalFormat = computed(() => getFileExtension(props.src));
const format = computed(() => (originalFormat.value === 'svg' ? 'svg' : 'webp'));

const $img = useNuxtImage();
const $element = templateRef<HTMLImageElement>('$element');
let isVisible: Ref<boolean>;

if (props.preload) {
	isVisible = readonly(ref(true));
} else {
	isVisible = useVisible($element, {
		once: true
	});
}

const placeholder = computed(() => {
	if (props.blurhash) {
		return createPlaceholderFromHash({
			hash: props.blurhash,
			hashType: 'blurhash',
			ratio: props.width && props.height ? props.width / props.height : undefined
		});
	}
	return $img(props.src, { quality: 90, width: 100, fit: 'cover', format: 'webp' });
});

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
</script>
<style scoped lang="scss">
.picture {
	$self: &;

	display: block;
	overflow: hidden;

	img {
		display: block;
	}
}
</style>
