<script setup lang="ts">
import {
	Icon,
	Icon24Css,
	Icon24Html,
	Icon24Javascript,
	Icon24Laravel,
	Icon24Nuxt,
	Icon24Php,
	Icon24Scss,
	Icon24Typescript,
	Icon24Vue,
	Icon32Css,
	Icon32Html,
	Icon32Javascript,
	Icon32Laravel,
	Icon32Nuxt,
	Icon32Php,
	Icon32Scss,
	Icon32Typescript,
	Icon32Vue
} from '~/components/ui/icons';
import TheSection from '~/components/TheSection.vue';
import TheIcon from '~/components/elements/TheIcon.vue';
import { computed, useIsSmallDisplay } from '#imports';

interface Skill {
	key: string;
	name: string;
	icon: Icon;
}
const isSmallDisplay = useIsSmallDisplay();

const skills = computed<Skill[]>(() => [
	{
		key: 'html',
		name: 'HTML',
		icon: isSmallDisplay ? Icon24Html : Icon32Html
	},
	{
		key: 'css',
		name: 'Css',
		icon: isSmallDisplay ? Icon24Css : Icon32Css
	},
	{
		key: 'javascript',
		name: 'JavaScript',
		icon: isSmallDisplay ? Icon24Javascript : Icon32Javascript
	},
	{
		key: 'nuxt',
		name: 'Nuxt',
		icon: isSmallDisplay ? Icon24Nuxt : Icon32Nuxt
	},
	{
		key: 'vue',
		name: 'Vue',
		icon: isSmallDisplay ? Icon24Vue : Icon32Vue
	},
	{
		key: 'scss',
		name: 'Scss',
		icon: isSmallDisplay ? Icon24Scss : Icon32Scss
	},
	{
		key: 'typescript',
		name: 'TypeScript',
		icon: isSmallDisplay ? Icon24Typescript : Icon32Typescript
	},
	{
		key: 'php',
		name: 'PHP',
		icon: isSmallDisplay ? Icon24Php : Icon32Php
	},
	{
		key: 'laravel',
		name: 'Laravel',
		icon: isSmallDisplay ? Icon24Laravel : Icon32Laravel
	}
]);
</script>

<template>
	<the-section title="Навыки разработки" class="section-developments-skills">
		<div class="section-developments-skills-content">
			<ul>
				<li v-for="skill in skills" :key="skill.key" :data-key="skill.key">
					<the-icon :icon="skill.icon" />
					<span>{{ skill.name }}</span>
				</li>
			</ul>
		</div>
	</the-section>
</template>

<style lang="scss">
@use 'assets/style/utility';

.section-developments-skills {
	margin-right: calc(var(--ears) * -1);
	margin-left: calc(var(--ears) * -1);
	padding: #{utility.rem(128)} var(--ears);
	background-color: var(--lighter-fill);

	@media screen and (width <= 1424px) {
		padding: #{utility.rem(64)} var(--ears);
	}
}

.section-developments-skills-content {
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: #{utility.rem(16)};
		justify-content: center;
		padding: 0;
		list-style: none;

		@media screen and (width > 1424px) {
			padding: 0 5%;
		}

		li {
			display: flex;
			gap: #{utility.rem(16)};
			justify-content: center;
			align-items: center;
			padding: #{utility.rem(16)} #{utility.rem(32)};
			border-radius: #{utility.rem(8)};
			background-color: var(--light-fill);
			font-weight: 500;
			font-size: #{utility.rem(32)};
			line-height: 130%;

			.icon {
				width: #{utility.rem(32)};
				height: #{utility.rem(32)};
			}

			span {
				color: var(--primary-text);
			}

			&[data-key='html'] {
				color: var(--brand-html);
			}

			&[data-key='css'] {
				color: var(--brand-css);
			}

			&[data-key='javascript'] {
				color: var(--brand-javascript);
			}

			&[data-key='nuxt'] {
				color: var(--brand-nuxt);
			}

			&[data-key='vue'] {
				color: var(--brand-vue);
			}

			&[data-key='scss'] {
				color: var(--brand-scss);
			}

			&[data-key='typescript'] {
				color: var(--brand-typescript);
			}

			&[data-key='php'] {
				color: var(--brand-php);
			}

			&[data-key='laravel'] {
				color: var(--brand-laravel);
			}
		}

		@media screen and (width <= 1424px) {
			gap: #{utility.rem(8)};

			li {
				gap: #{utility.rem(8)};
				padding: #{utility.rem(8)} #{utility.rem(16)};
				font-size: #{utility.rem(16)};

				.icon {
					width: #{utility.rem(24)};
					height: #{utility.rem(24)};
				}
			}
		}
	}
}
</style>
