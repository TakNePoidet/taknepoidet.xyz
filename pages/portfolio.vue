<script setup lang="ts">
import { computed, definePageMeta, useRoute } from '#imports';
import BasePage from '~/components/BasePage.vue';
import BaseSection from '~/components/BaseSection.vue';
import YearsGroupPortfolios from '~/components/portfolios/portfolios-years-group.vue';
import Seo from '~/components/utils/Seo.vue';
import { Page } from '~/utils/page';
import Listing from '~/components/portfolios/listing.vue';
import { ModelPortfolio, Tag, usePortfolioStore } from '~/stores/portfolio';
import { showError, useAsyncData } from '#imports';
import { storeToRefs } from 'pinia';

definePageMeta({
	name: Page.PortfolioListing
});

const portfolioStore = usePortfolioStore();

const { portfolios, tags } = storeToRefs(portfolioStore);
const route = useRoute();

const tag = computed<Tag | undefined>(() => {
	if (route.params.tag) {
		return (Array.isArray(route.params.tag) ? route.params.tag.at(0) : route.params.tag) as Tag;
	}
	return undefined;
});

if (tag.value && !tags.value.has(tag.value)) {
	throw showError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

await useAsyncData('portfolio', async () => {
	await portfolioStore.fetch();
	return null;
});

const filtered = computed(() => {
	if (tag.value && tags.value.get(tag.value)) {
		const { aliases } = tags.value.get(tag.value)!;
		return portfolios.value.filter((portfolio) => {
			return (
				portfolio.tags.filter(({ key }) => {
					return aliases.includes(key) || key === tag.value;
				}).length >= 1
			);
		});
	}
	return portfolios.value;
});

const years = computed(() => {
	return filtered.value.reduce((accumulator, portfolio) => {
		const year = portfolio.date.getFullYear();
		if (!accumulator.has(year)) {
			accumulator.set(year, []);
		}
		accumulator.get(year)?.push(portfolio);
		//
		return accumulator;
	}, new Map<number, ModelPortfolio[]>());
});

const start = computed(() => {
	let count = 0;
	for (const [year, items] of years.value.entries()) {
		count += items.length;
		if (count >= 6) {
			return year;
		}
	}
	return new Date().getFullYear();
});

const title = computed(() => {
	return tag.value
		? `Работы с использованием ${tags.value.get(tag.value)?.title}`
		: 'Работы, о которых хочется рассказать';
});
</script>

<template>
	<base-page>
		<seo :title="title" />
		<base-section :title="title" :badge="filtered.length" title-tag="h1">
			<div class="section-content-portfolios">
				<template v-if="filtered.length > 6">
					<years-group-portfolios
						v-for="[year, items] in years.entries()"
						:key="year"
						:title="year"
						:items="items"
						:open="start <= year"
					/>
				</template>
				<listing v-else :items="filtered" />
			</div>
		</base-section>
	</base-page>
</template>

<style scoped lang="scss">
@use 'assets/style/utility';
@use 'assets/style/breakpoints';

:deep(.section .section__title) {
	justify-content: flex-start;
	margin-bottom: #{utility.rem(32)};

	@include breakpoints.media-down('xl') {
		margin-bottom: #{utility.rem(16)};
		text-align: left;
	}
}

.section-content-portfolios {
	$self: '.years-group-portfolios';

	display: grid;

	:deep(.years-group-portfolios) {
		--border-radius--summary: max(0px, min(#{utility.rem(12)}, calc((100vw - 100%) * 9999)));

		@include breakpoints.media-up('xl') {
			--border-radius--summary: max(0px, min(#{utility.rem(16)}, calc((100vw - 100%) * 9999)));
		}

		&:first-child {
			#{$self}__summary {
				border-radius: var(--border-radius--summary) var(--border-radius--summary) 0 0;
			}
		}

		&:last-child {
			#{$self}__summary {
				border-radius: 0 0 var(--border-radius--summary) var(--border-radius--summary);
			}
		}

		&[open] {
			#{$self}__summary {
				border-radius: var(--border-radius--summary);
			}

			&:not(:first-child) {
				margin-top: max(0px, min(#{utility.rem(16)}, calc((100vw - 100%) * 9999)));

				@include breakpoints.media-down('xl') {
					margin-top: max(0px, min(#{utility.rem(12)}, calc((100vw - 100%) * 9999)));
				}
			}
		}

		#{$self}__summary {
			border: none;
			border-radius: 0;
		}

		&:has(+ #{$self}[open]) {
			#{$self}__summary {
				border-bottom-right-radius: var(--border-radius--summary);
				border-bottom-left-radius: var(--border-radius--summary);
			}
		}
		&[open] + #{$self} {
			#{$self}__summary {
				border-top-left-radius: var(--border-radius--summary);
				border-top-right-radius: var(--border-radius--summary);
			}
		}
	}
}
</style>
