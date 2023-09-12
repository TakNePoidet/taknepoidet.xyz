<script setup lang="ts">
import { useHost } from '~/composables/useHost';
import Seo from '~/components/utils/Seo.vue';
import ThePage from '~/components/ThePage.vue';
import TheDevelopmentSkills from '~/components/sections/TheDevelopmentSkills.vue';
import SectionHero from '~/components/sections/SectionHero.vue';
import SectionContacts from '~/components/sections/SectionContacts.vue';
import { computed, definePageMeta, Page } from '#imports';

definePageMeta({
	name: Page.Home
});
const host = useHost();
const cover = computed(() => `${host.value}/images/cover.jpg`);
const canonical = computed(() => host.value);
</script>

<template>
	<the-page>
		<seo title="Якин Никита" description="Персональный сайт Якина Никиты" :cover="cover" :canonical="canonical" />
		<section-hero />
		<section-contacts />
		<the-development-skills />
	</the-page>
</template>
