<script setup lang="ts">
import { useHost } from '~/composables/useHost';
import Seo from '~/components/utils/Seo.vue';
import BasePage from '~/components/BasePage.vue';
import SectionHero from '~/components/sections/SectionHero.vue';
import SectionContacts from '~/components/sections/SectionContacts.vue';
import { computed, definePageMeta, Page } from '#imports';
import SectionPortfolio from '~/components/sections/SectionPortfolio.vue';
import SectionDevelopmentSkills from '~/components/sections/SectionDevelopmentSkills.vue';

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
		<section-portfolio />
	</base-page>
</template>
