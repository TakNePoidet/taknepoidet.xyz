<script setup lang="ts">
import BaseSection from '~/components/BaseSection.vue';
import { computed, Page, useIsSmallDisplay } from '#imports';
import { ModelTag, Tag, usePortfolioStore } from '~/stores/portfolio';
import { storeToRefs } from 'pinia';
import BaseIcon from '~/components/elements/BaseIcon.vue';

interface Skill {
	key: string;
	name: string;
	tag?: ModelTag;
}
const isSmallDisplay = useIsSmallDisplay();

const portfolioStore = usePortfolioStore();

const { tags } = storeToRefs(portfolioStore);

const skills = computed<Skill[]>(() => {
	return [
		{
			key: 'html',
			name: 'HTML'
		},
		{
			key: 'css',
			name: 'Css'
		},
		{
			key: 'javascript',
			name: 'JavaScript'
		},
		{
			key: 'nuxt',
			name: 'Nuxt'
		},
		{
			key: 'vue',
			name: 'Vue'
		},
		{
			key: 'scss',
			name: 'Scss'
		},
		{
			key: 'typescript',
			name: 'TypeScript'
		},
		{
			key: 'php',
			name: 'PHP'
		},
		{
			key: 'laravel',
			name: 'Laravel'
		}
	].map((skill) => {
		const tag = tags.value.get(skill.key as Tag);

		if (tag) {
			return { ...skill, tag };
		}
		return skill;
	});
});
</script>

<template>
	<base-section title="Навыки разработки" class="section-developments-skills">
		<div class="section-developments-skills-content">
			<ul>
				<li v-for="skill in skills" :key="skill.key" :data-key="skill.key">
					<nuxt-link v-if="skill.tag" :to="{ name: Page.PortfolioListingTag, params: { tag: skill.tag.key } }">{{
						skill.name
					}}</nuxt-link>
					<span v-else>{{ skill.name }}</span>
					<base-icon :name="skill.key" />
				</li>
			</ul>
		</div>
	</base-section>
</template>

<style scoped lang="scss">
@use 'assets/style/utility';
@use 'assets/style/breakpoints';

.section-developments-skills {
	padding: #{utility.rem(128)} #{utility.rem(16)};
	border-radius: #{utility.rem(16)};
	background-color: var(--dark-fill);

	:deep(.section__title) {
		color: var(--white);

		@include breakpoints.media-down('xxl') {
			margin-bottom: #{utility.rem(16)};
		}
	}

	@include breakpoints.media-down('xl') {
		padding: #{utility.rem(24)} #{utility.rem(16)} #{utility.rem(16)};
		border-radius: #{utility.rem(12)};
	}
}

.section-developments-skills-content {
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: #{utility.rem(24)};
		justify-content: center;
		padding: 0 15%;
		list-style: none;

		@include breakpoints.media-up('xxl') {
			padding: 0 15%;
		}

		@include breakpoints.media-down('xxl') {
			gap: #{utility.rem(16)};
			padding: 0;
		}

		li {
			position: relative;
			display: flex;
			gap: #{utility.rem(8)};
			justify-content: center;
			align-items: center;
			padding: #{utility.rem(16)} #{utility.rem(24)};
			border-radius: #{utility.rem(12)};
			background-color: var(--blank-fill);
			font-weight: 500;
			font-size: #{utility.rem(32)};
			line-height: 130%;
			transition:
				background-color var(--transition-animation),
				color var(--transition-animation);

			.icon {
				width: #{utility.rem(32)};
				height: #{utility.rem(32)};
			}

			span,
			a {
				color: var(--primary-text);
			}

			a {
				text-decoration: none;

				&::after {
					content: '';
					position: absolute;
					inset: 0;
					border-radius: #{utility.rem(12)};
				}
			}

			&:has(a) {
				@include utility.has-hover {
					color: var(--white);

					a {
						color: currentcolor;
					}
				}
			}

			&[data-key='html'] {
				color: var(--brand-html);

				&:has(a) {
					@include utility.has-hover {
						background-color: var(--brand-html);

						//@include breakpoints.media-down('xl') {
						//	background-color: transparent;
						//	color: var(--brand-html);
						//}
					}
				}
			}

			&[data-key='css'] {
				color: var(--brand-css);

				&:has(a) {
					@include utility.has-hover {
						background-color: var(--brand-css);

						@include breakpoints.media-down('xl') {
							background-color: transparent;
							color: var(--brand-css);
						}
					}
				}
			}

			&[data-key='javascript'] {
				color: var(--brand-javascript);

				&:has(a) {
					@include utility.has-hover {
						background-color: var(--brand-javascript);

						@include breakpoints.media-down('xl') {
							background-color: transparent;
							color: var(--brand-javascript);
						}
					}
				}
			}

			&[data-key='nuxt'] {
				color: var(--brand-nuxt);

				&:has(a) {
					@include utility.has-hover {
						background-color: var(--brand-nuxt);

						@include breakpoints.media-down('xl') {
							background-color: transparent;
							color: var(--brand-nuxt);
						}
					}
				}
			}

			&[data-key='vue'] {
				color: var(--brand-vue);

				&:has(a) {
					@include utility.has-hover {
						background-color: var(--brand-vue);

						@include breakpoints.media-down('xl') {
							background-color: transparent;
							color: var(--brand-vue);
						}
					}
				}
			}

			&[data-key='scss'] {
				color: var(--brand-scss);

				&:has(a) {
					@include utility.has-hover {
						background-color: var(--brand-scss);

						@include breakpoints.media-down('xl') {
							background-color: transparent;
							color: var(--brand-scss);
						}
					}
				}
			}

			&[data-key='typescript'] {
				color: var(--brand-typescript);

				&:has(a) {
					@include utility.has-hover {
						background-color: var(--brand-typescript);

						@include breakpoints.media-down('xl') {
							background-color: transparent;
							color: var(--brand-typescript);
						}
					}
				}
			}

			&[data-key='php'] {
				color: var(--brand-php);

				&:has(a) {
					@include utility.has-hover {
						background-color: var(--brand-php);
					}

					@include breakpoints.media-down('xl') {
						background-color: transparent;
						color: var(--brand-php);
					}
				}
			}

			&[data-key='laravel'] {
				color: var(--brand-laravel);

				&:has(a) {
					@include utility.has-hover {
						background-color: var(--brand-laravel);
					}

					@include breakpoints.media-down('xl') {
						background-color: transparent;
						color: var(--brand-laravel);
					}
				}
			}
		}

		@include breakpoints.media-down('xl') {
			display: grid;
			grid-template-columns: 1fr;
			gap: #{utility.rem(12)};

			li {
				gap: #{utility.rem(8)};
				justify-content: flex-start;
				padding: 0;
				border-radius: #{utility.rem(6)};
				background-color: transparent;
				color: var(--white);
				font-size: #{utility.rem(20)};

				a {
					color: var(--white);
				}

				.icon {
					width: #{utility.rem(32)};
					height: #{utility.rem(32)};
				}
			}
		}
	}
}
</style>
