<script setup lang="ts">
import type { GlitchResult } from 'powerglitch';
import { PowerGlitch } from 'powerglitch';

import { definePageMeta, onBeforeMount, onMounted, Page, templateRef } from '#imports';
import BaseIcon from '~/components/elements/BaseIcon.vue';
import BasePicture from '~/components/elements/BasePicture.vue';
import Seo from '~/components/utils/Seo.vue';

definePageMeta({
	layout: 'error',
	alias: ['/:pathMatch(.*)*']
});

const $root = templateRef<HTMLElement>('$root');
let powerGlitch: GlitchResult;
onMounted(() => {
	if (!$root.value) {
		return;
	}
	powerGlitch?.stopGlitch();
	powerGlitch = PowerGlitch.glitch($root.value, {
		playMode: 'always',
		hideOverflow: true
	});
});

onBeforeMount(() => {
	powerGlitch?.stopGlitch();
});
</script>

<template>
	<div ref="$root" class="error-404">
		<seo title="Страница не найдена" />
		<h1>404</h1>
		<div class="error-404__content">
			<base-picture preload alt="Я" :height="256" :width="256" src="/images/404.png" />
			<nuxt-link :to="{ name: Page.Home }">На главную <base-icon name="link" /></nuxt-link>
		</div>
	</div>
</template>

<style>
.layout-404 {
	margin: 0;
	padding: 0;
}
</style>
<style scoped lang="scss">
@use 'assets/style/utility';
@use 'assets/style/breakpoints';
@use 'sass:math';

.error-404 {
	display: flex;
	gap: #{utility.rem(64)};
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;

	//line-height: 100%; /* 256px */
	text-align: center;

	h1 {
		margin: 0;
		padding: 0;
		color: var(--primary-text);
		font-weight: 800;
		font-style: normal;
		font-size: #{utility.rem(256)};
	}

	& &__content {
		display: grid;
		justify-items: center;
		padding-left: #{utility.rem(64)};
		border: 0 solid var(--base-border);
		border-left-width: 1px;

		a {
			display: flex;
			gap: #{utility.rem(12)};
			justify-content: center;
			align-items: center;
			padding: #{utility.rem(16)} #{utility.rem(32)};
			border-radius: #{utility.rem(100)};
			background: var(--brand-color);
			color: var(--brand-color-invert);
			font-weight: 400;
			font-style: normal;
			font-size: #{utility.rem(32)};
			line-height: 130%; /* 41.6px */
			text-decoration: none;
			transition: opacity var(--transition-animation);

			@include utility.has-hover {
				opacity: 0.9;
			}
		}
	}

	@include breakpoints.media-down('xl') {
		display: flex;
		flex-direction: column;
		gap: #{utility.rem(32)};
		align-items: center;

		h1 {
			font-size: #{utility.rem(128)};
		}

		& &__content {
			@include breakpoints.media-down('xl') {
				padding-top: #{utility.rem(0)};
				padding-left: 0;
				border-top-width: 1px;
				border-left-width: 0;
			}

			:deep(img) {
				width: #{utility.rem(128)};
				height: #{utility.rem(128)};
			}

			a {
				height: auto;
				padding: #{utility.rem(12)} #{utility.rem(24)};
				font-size: #{utility.rem(24)};

				:deep(.icon) {
					width: #{utility.rem(24)};
					height: #{utility.rem(24)};
				}
			}
		}
	}
}
</style>
