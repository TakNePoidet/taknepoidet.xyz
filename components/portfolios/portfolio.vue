<script setup lang="ts">
import { PropType } from 'vue';
import { ModelPortfolio } from '~/stores/portfolio';
import BasePicture from '~/components/elements/BasePicture.vue';
import BaseIcon from '~/components/elements/BaseIcon.vue';
import { Page } from '~/utils/page';

defineProps({
	article: {
		type: Object as PropType<ModelPortfolio>,
		required: true
	}
});
</script>

<template>
	<article :id="article.slug" class="portfolio">
		<base-picture
			v-if="article.cover"
			class="portfolio__cover"
			:alt="article.title"
			:height="628"
			:width="1200"
			:src="article.cover"
		/>
		<div class="portfolio__content">
			<h3 class="portfolio__title">{{ article.title }}</h3>
			<ul v-if="article.tags.length > 0" class="portfolio__tags">
				<li v-for="tag in article.tags.values()" :key="tag.key">
					<nuxt-link :to="{ name: Page.PortfolioListingTag, params: { tag: tag.key } }"> #{{ tag.title }} </nuxt-link>
				</li>
			</ul>
		</div>

		<nuxt-link v-if="article.permalink" class="portfolio__link" :href="article.permalink" target="_blank">
			Посмотреть
			<base-icon name="link" />
		</nuxt-link>
	</article>
</template>

<style scoped lang="scss">
@use 'assets/style/utility';
@use 'assets/style/breakpoints';

.portfolio {
	$self: &;

	position: relative;
	display: flex;
	gap: #{utility.rem(20)};
	padding: #{utility.rem(20)};
	border-radius: max(0px, min(#{utility.rem(16)}, calc((100vw - 100%) * 9999)));

	& &__cover {
		:deep(img) {
			width: auto;
			height: #{utility.rem(100)};
			border-radius: #{utility.rem(12)};
		}
	}

	& &__content {
		display: flex;
		flex: 1 0 0;
		flex-direction: column;
		gap: #{utility.rem(16)};
		align-items: flex-start;
	}

	& &__title {
		color: var(--primary-text);
		font-weight: 500;
		font-size: #{utility.rem(32)};
		line-height: 130%; /* 41.6px */
	}

	& &__tags {
		display: flex;
		flex-wrap: wrap;
		gap: #{utility.rem(16)};
		align-items: flex-start;
		margin: 0;
		padding: 0;
		color: var(--regular-text);
		list-style: none;
		font-weight: 500;
		font-size: #{utility.rem(32)};
		line-height: 130%; /* 41.6px */
		a {
			position: relative;
			z-index: 1;
			color: inherit;
			text-decoration: none;
			transition: color var(--transition-animation);

			@include utility.has-hover {
				color: var(--brand-color);
				text-decoration: underline;
			}
		}
	}

	& &__link {
		display: flex;
		gap: #{utility.rem(8)};
		align-items: center;
		align-self: end;
		padding: #{utility.rem(16)} #{utility.rem(32)};
		border-radius: #{utility.rem(12)};
		background-color: var(--blank-fill);
		color: var(--brand-color);
		font-weight: 500;
		font-size: #{utility.rem(32)};
		line-height: 130%;
		text-decoration: none;

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			border-radius: #{utility.rem(16)};
		}

		&:deep(.icon) {
			width: #{utility.rem(32)};
		}
	}

	&:has(&__link) {
		transition:
			background 200ms ease-in-out,
			border-color 200ms ease-in-out;

		@include utility.has-hover {
			@include breakpoints.media-up('xl') {
				border-color: var(--base-border);
				background: var(--lighter-fill);
			}

			@include breakpoints.media-down('xl') {
				#{$self}__title {
					text-decoration: underline;
				}
			}
		}
	}

	@include breakpoints.media-down('xxl') {
		gap: #{utility.rem(16)};
		padding: #{utility.rem(16)};
		border-radius: max(0px, min(#{utility.rem(12)}, calc((100vw - 100%) * 9999)));
		#{$self}__content {
			gap: #{utility.rem(8)};
		}
		#{$self}__cover :deep(img),
		#{$self}__link {
			border-radius: #{utility.rem(8)};
		}
		#{$self}__cover :deep(img) {
			height: #{utility.rem(70)};
		}

		#{$self}__title,
		#{$self}__tags,
		#{$self}__link {
			font-size: #{utility.rem(24)};
		}
		#{$self}__link {
			gap: #{utility.rem(4)};
			padding: #{utility.rem(12)} #{utility.rem(24)};

			&:deep(.icon) {
				width: #{utility.rem(24)};
			}
		}
	}

	@include breakpoints.media-down('xl') {
		display: grid;
		gap: #{utility.rem(12)};

		//justify-items: end;
		padding-top: 0;
		padding-bottom: 0;
		#{$self}__tags,
		#{$self}__link {
			font-size: #{utility.rem(18)};
		}
		#{$self}__title {
			font-size: #{utility.rem(20)};
		}
		#{$self}__cover :deep(img) {
			width: 100%;
			height: auto;
		}
		#{$self}__link {
			gap: #{utility.rem(2)};

			//justify-content: flex-end;
			padding: 0;

			&:deep(.icon) {
				width: #{utility.rem(16)};
			}
		}
		#{$self}__tags {
			gap: #{utility.rem(8)} #{utility.rem(12)};
		}
	}
}
</style>
