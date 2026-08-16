<script setup lang="ts">
import { computed, definePageMeta, Page } from '#imports';
import BasePage from '~/components/BasePage.vue';
import SectionContacts from '~/components/sections/SectionContacts.vue';
import SectionDevelopmentSkills from '~/components/sections/SectionDevelopmentSkills.vue';
import SectionHero from '~/components/sections/SectionHero.vue';
import SectionInventory from '~/components/sections/SectionInventory.vue';
import SectionPortfolio from '~/components/sections/SectionPortfolio.vue';
import Seo from '~/components/utils/Seo.vue';
import { useHost } from '~/composables/useHost';

definePageMeta({
	name: Page.Home
});
const host = useHost();
const cover = computed(() => `${host.value}/images/cover.jpg`);
const canonical = computed(() => host.value);
</script>

<template>
	<base-page>
		<seo title="Якин Никита" description="Персональный сайт Якина Никиты" :cover="cover" :canonical="canonical" />
		<section-hero />
		<section-contacts />
		<section-development-skills />
		<section-portfolio id="portfolio" />
		<section-inventory id="inventory" />
	</base-page>
</template>
