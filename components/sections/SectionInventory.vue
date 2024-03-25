<script setup lang="ts">
import { $fetch } from 'ofetch';
import { computed } from 'vue';

import { useAsyncData } from '#imports';
import { Icons } from '#sprite';
import BaseSection from '~/components/BaseSection.vue';
import BaseIcon from '~/components/elements/BaseIcon.vue';
import MotionScroll from '~/components/utils/MotionScroll.vue';

interface Repo {
	key: string;
	title: string;
}

const repos = computed<Repo[]>(() => [
	{ title: 'Консольная утилита для генерации ThumbHash', key: 'TakNePoidet/thumbhash-cli' },
	{ title: 'Модуль Яндекс Метрики для Nuxt 3', key: 'TakNePoidet/nuxt-yandex-metrika' },
	{ title: 'Группировка и наследование маршрутов в Fastify', key: 'TakNePoidet/fastify-route-group' },
	{ title: 'Набор правил для Prettier, Eslint, Stylelint', key: 'poidet/config' },
	{ title: 'Вспомогательные направляющие для вёрстки', key: 'TakNePoidet/layout-grid-helper' },
	{ title: 'SVG Sprite Module', key: 'poidet/svg-sprite' },
	{ title: 'Утилиты', key: 'prleasing/utility' }
]);
const keys = computed(() => repos.value.map(({ key }) => key));
const { data } = useAsyncData(
	() => $fetch<{ stars: Record<string, number> }>('https://ungh.cc/stars/' + keys.value.join('+')),
	{
		server: false
	}
);

const stars = computed(() => {
	return data.value?.stars ?? {};
});
</script>

<template>
	<motion-scroll>
		<base-section title="Инвентарь" :badge="repos.length">
			<div class="section-inventory-content">
				<template v-for="(repo, index) in repos" :key="repo.key">
					<article class="repo">
						<div class="repo__title">
							<!-- eslint-disable-next-line no-irregular-whitespace-->
							{{ index + 1 }}. 
							<h2>
								<a target="_blank" :href="`https://github.com/${repo.key}`">{{ repo.title }}</a>
							</h2>
						</div>
						<ul class="repo__labels">
							<li v-if="stars[repo.key] > 0">
								<base-icon :name="Icons.Star" />
								{{ stars[repo.key] ?? 0 }}
							</li>
						</ul>
					</article>
					<hr v-if="index < repos.length - 1" />
				</template>
			</div>
		</base-section>
	</motion-scroll>
</template>

<style scoped lang="scss">
@use 'assets/style/utility';
@use 'assets/style/breakpoints';

.section-inventory-content {
	display: grid;
	gap: #{utility.rem(32)};
	padding: #{utility.rem(32 * 1.5)} #{utility.rem(32)};
	border-radius: #{utility.rem(12)};
	background: var(--brand-color);
	background-color: var(--brand-color);

	> hr {
		width: 100%;
		height: 1px;
		padding: 0;
		border: 0;
		background: rgb(235 235 235 / 50%);
	}

	@include breakpoints.media-down('xl') {
		gap: #{utility.rem(16)};
		padding: #{utility.rem(16 * 1.5)} #{utility.rem(16)};
	}
}

.repo {
	display: flex;
	gap: #{utility.rem(24)};

	& &__title {
		position: relative;
		display: flex;
		color: var(--white);
		font-weight: 700;
		font-style: normal;
		font-size: #{utility.rem(32)};
		line-height: 130%; /* 41.6px */
		font-kerning: none;

		h2 {
			margin: 0;
			padding: 0;
			font: inherit;

			a {
				color: inherit;

				&:not(&:hover) {
					text-decoration: none;
				}

				&::after {
					content: '';
					position: absolute;
					inset: 0;

					//border-radius: #{utility.rem(16)};
				}
			}
		}
	}

	& &__labels {
		display: flex;
		gap: #{utility.rem(12)};
		margin: 0;
		padding: 0;
		list-style: none;

		li {
			display: flex;
			gap: 8px;
			align-items: center;
			padding: #{utility.rem(4)} #{utility.rem(8)};
			border-radius: #{utility.rem(8)};
			background: rgb(255 255 255 / 10%);
			color: #fff;
			font-weight: 500;
			font-style: normal;
			font-size: #{utility.rem(24)};
			line-height: 130%; /* 31.2px */
		}
	}

	@include breakpoints.media-down('xl') {
		gap: #{utility.rem(16)};
		align-items: flex-start;

		& &__title {
			font-size: #{utility.rem(20)};
		}

		& &__labels {
			li {
				padding: #{utility.rem(4)} #{utility.rem(8)};
				font-size: #{utility.rem(16)};

				svg {
					width: #{utility.rem(24)};
				}
			}
		}
	}
}
</style>
