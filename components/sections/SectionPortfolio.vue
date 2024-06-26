<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useAsyncData } from '#app';
import { computed, Page } from '#imports';
import BaseSection from '~/components/BaseSection.vue';
import BasePicture from '~/components/elements/BasePicture.vue';
import MotionScroll from '~/components/utils/MotionScroll.vue';
import SrOnly from '~/components/utils/SrOnly.vue';
import type { ModelPortfolio } from '~/stores/portfolio';
import { usePortfolioStore } from '~/stores/portfolio';

const portfolioStore = usePortfolioStore();
await useAsyncData('portfolios', portfolioStore.fetch);

const { portfolios } = storeToRefs(portfolioStore);

const favorites = computed<ModelPortfolio[]>(() => {
	const list = ['pr-liz', 'studio-banan', 'ufa-450', 'i-calendar'];

	return portfolios.value
		.filter(({ slug }) => {
			return list.includes(slug);
		})
		.sort((a, b) => {
			return list.findIndex((item) => item === a.slug) > list.findIndex((item) => item === b.slug) ? 1 : -1;
		});
});
</script>

<template>
	<motion-scroll>
		<base-section title="Работы, о которых хочется рассказать" :badge="portfolios.length" class="section-portfolio">
			<div class="section-portfolio-content">
				<div v-for="item in favorites" :key="item._id" class="portfolio-preview">
					<nuxt-link :href="item.permalink" target="_blank" :title="item.title">
						<base-picture
							v-if="item.cover"
							:alt="item.title"
							:height="628"
							:width="1200"
							:src="item.cover"
							:thumbhash="item.thumbhash"
						/>
						<sr-only>{{ item.title }}</sr-only>
					</nuxt-link>
				</div>
				<div class="section-portfolio-content__more">
					<div class="arrow">
						<hr />

						<svg width="51" height="16" fill="none" viewBox="0 0 51 16">
							<path
								fill="currentColor"
								d="M50.707 8.707a1 1 0 0 0 0-1.414L44.343.929a1 1 0 1 0-1.414 1.414L48.586 8l-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364ZM0 9h50V7H0v2Z"
							/>
						</svg>
					</div>
					<nuxt-link :href="{ name: Page.PortfolioListing }">
						<span>Показать ещё</span>
						<small>({{ portfolios.length - favorites.length }})</small>
					</nuxt-link>
				</div>
			</div>
		</base-section>
	</motion-scroll>
</template>

<style lang="scss" scoped>
@use 'assets/style/utility';
@use 'assets/style/breakpoints';
@use 'assets/style/focus-visible';

.section-portfolio-content {
	display: grid;

	//grid-template-rows: #{utility.rem(432)} #{utility.rem(326)};
	grid-template-columns: repeat(1, 1fr);

	@include breakpoints.media-up('xl') {
		grid-template-columns: repeat(12, 1fr);
	}

	gap: #{utility.rem(16)};

	.open-source-preview,
	.portfolio-preview {
		order: 999;
		border-radius: #{utility.rem(12)};

		@include breakpoints.media-down('xl') {
			border-radius: #{utility.rem(12)};
		}
	}

	.portfolio-preview {
		a {
			display: block;
			height: 100%;
			border-radius: inherit;
		}

		:deep(.picture) {
			width: 100%;
			height: 100%;
			border-radius: inherit;
		}

		:deep(.picture) img {
			object-fit: cover;
			width: 100%;
			height: 100%;
			border-radius: inherit;
		}

		@include breakpoints.media-up('xl') {
			&:nth-child(1) {
				grid-column: 1/ 9;
				order: 1;
			}

			&:nth-child(2) {
				grid-column: 9/ 13;
				order: 2;
			}

			&:nth-child(3) {
				grid-column: 1/ 7;
			}

			&:nth-child(4) {
				grid-column: 7/ 13;
			}
		}

		@include breakpoints.media-down('xl') {
			&:nth-child(1),
			&:nth-child(2),
			&:nth-child(3) {
				order: 1;
			}
		}
	}

	& &__more {
		position: relative;
		display: flex;
		grid-column: 1/ -1;
		gap: #{utility.rem(16)};
		justify-content: center;
		align-items: center;
		order: 9999;
		padding: #{utility.rem(16)} #{utility.rem(16)};
		border-radius: #{utility.rem(12)};
		color: var(--brand-color, #0074e0);
		font-weight: 600;
		font-style: normal;
		font-size: #{utility.rem(24)};
		line-height: 100%; /* 32px */
		text-align: center;
		text-decoration: none;

		a {
			display: flex;
			gap: #{utility.rem(4)};
			align-items: flex-start;
			color: inherit;
			text-decoration: none;

			small {
				color: var(--regular-text);
				font-size: 0.5em;
				line-height: 1;
			}

			&::after {
				@include focus-visible.setup;

				content: '';
				position: absolute;
				inset: 0;
				border-radius: #{utility.rem(12)};
			}

			&:focus-visible {
				@include focus-visible.disabled;

				&::after {
					@include focus-visible.active;
				}
			}

			@include breakpoints.media-down('xl') {
				font-size: #{utility.rem(20)};

				.arrow {
					display: none;
				}
			}
		}

		&:has(a) {
			transition: background-color var(--transition-animation);

			@include utility.has-hover {
				background-color: var(--lighter-fill);
			}
		}

		@include breakpoints.media-up('xxl') {
			gap: #{utility.rem(16)};
			padding: #{utility.rem(32)} #{utility.rem(32)};
			border-radius: #{utility.rem(12)};
			font-size: #{utility.rem(32)};

			a {
				gap: #{utility.rem(8)};
			}
		}
	}

	@include breakpoints.media-down('xl') {
		gap: #{utility.rem(12)};
	}
}

.arrow {
	display: flex;
	flex: 1;
	align-items: center;
	color: var(--brand-color);

	hr {
		flex: 1;
		width: 100%;
		height: 2px;
		border: 0;
		background-color: currentcolor;
	}
}
</style>
