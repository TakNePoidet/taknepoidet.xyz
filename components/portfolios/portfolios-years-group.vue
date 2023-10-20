<script setup lang="ts">
import type { PropType } from 'vue';

import BaseIcon from '~/components/elements/BaseIcon.vue';
import Listing from '~/components/portfolios/listing.vue';
import { useCollapse } from '~/composables/useCollapse';
import type { ModelPortfolio } from '~/stores/portfolio';

const { open } = defineProps({
	title: {
		type: [String, Number] as PropType<string | number>,
		required: true
	},
	items: {
		type: Array as PropType<ModelPortfolio[]>,
		required: true
	},
	open: {
		type: Boolean as PropType<boolean>,
		default: false
	}
});

const { $container, $summary, $content, toggle, isOpen } = useCollapse(open);
</script>

<template>
	<details ref="$container" class="years-group-portfolios" :open="isOpen">
		<!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events, vuejs-accessibility/no-static-element-interactions		-->
		<summary ref="$summary" class="years-group-portfolios__summary" @click.prevent.stop="toggle">
			{{ title }}
			<span
				>{{ isOpen ? 'Свернуть' : 'Раскрыть' }}
				<base-icon :name="isOpen ? 'arrow-badge-down' : 'arrow-badge-up'" />
			</span>
		</summary>

		<div ref="$content" class="years-group-portfolios__content">
			<div v-if="false" class="years-group-portfolios__arrow">
				<hr />
				<svg width="16" height="101" viewBox="0 0 16 101" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M7.29289 100.707C7.68342 101.098 8.31658 101.098 8.70711 100.707L15.0711 94.3431C15.4616 93.9526 15.4616 93.3195 15.0711 92.9289C14.6805 92.5384 14.0474 92.5384 13.6569 92.9289L8 98.5858L2.34315 92.9289C1.95262 92.5384 1.31946 92.5384 0.928932 92.9289C0.538408 93.3195 0.538408 93.9526 0.928932 94.3431L7.29289 100.707ZM7 0L7 100H9L9 0L7 0Z"
						fill="currentColor"
					/>
				</svg>
			</div>

			<div ref="$items" class="years-group-portfolios__items">
				<listing :items="items" />
			</div>
		</div>
	</details>
</template>

<style scoped lang="scss">
@use 'assets/style/utility';
@use 'assets/style/breakpoints';

.years-group-portfolios {
	$self: &;

	margin: 0 calc(var(--ears) * -1);
	transition: margin-top var(--transition-animation);

	& &__summary {
		display: flex;
		gap: #{utility.rem(16)};
		justify-content: space-between;
		margin: 0;
		padding: #{utility.rem(16)};
		border: 1px solid var(--base-border);
		border-radius: #{utility.rem(16)};
		background: var(--lighter-fill);
		color: var(--regular-text);
		list-style: none;
		font-weight: 500;
		font-size: #{utility.rem(64)};
		line-height: 100%; /* 64px */
		transition:
			border-color var(--transition-animation),
			background-color var(--transition-animation),
			color var(--transition-animation),
			border-radius var(--transition-animation);
		appearance: none;

		&::-webkit-details-marker {
			display: none;
		}

		span {
			display: flex;
			gap: #{utility.rem(4)};
			align-items: center;
			align-self: end;
			padding: #{utility.rem(12)} #{utility.rem(24)};
			border-radius: #{utility.rem(12)};
			color: var(--regular-text);
			font-weight: 500;
			font-size: #{utility.rem(24)};
			line-height: 130%;
			text-decoration: none;
			transition: color var(--transition-animation);

			&:deep(.icon) {
				width: #{utility.rem(24)};
			}
		}

		@include utility.has-hover {
			cursor: pointer;
		}
	}

	&[open] {
		#{$self}__summary {
			border-color: var(--blank-fill);
			background-color: var(--blank-fill);
			color: var(--brand-color);

			@include utility.has-hover {
				border-color: var(--base-border);
				background-color: var(--lighter-fill);
			}
		}
	}

	&:not([open]) {
		#{$self}__summary {
			@include utility.has-hover {
				color: var(--brand-color);

				span {
					color: var(--brand-color);
				}
			}
		}
	}

	& &__content {
		display: grid;

		//grid-template-columns: #{utility.rem(32)} 1fr;
		//padding: #{utility.rem(16)} 0;
		padding-bottom: #{utility.rem(16)};
	}

	& &__arrow {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		color: var(--brand-color);

		hr {
			flex: 1;
			width: 2px;
			border: 0;
			background-color: currentcolor;
		}

		//height: ;
	}

	@include breakpoints.media-up('xxl') {
		#{$self}__summary {
			gap: #{utility.rem(20)};
			padding: #{utility.rem(20)};
			border-radius: 0;

			//border-radius: max(0px, min(#{utility.rem(16)}, (100% - var(--container) + var(--ears) * -2) * 9999)) / #{utility.rem(16)};
			font-weight: 600;

			span {
				gap: #{utility.rem(8)};
				padding: #{utility.rem(16)} #{utility.rem(24)};
				font-size: #{utility.rem(32)};

				&:deep(.icon) {
					width: #{utility.rem(24)};
				}
			}
		}
		#{$self}__content {
			padding-bottom: #{utility.rem(24)};
		}
	}

	@include breakpoints.media-down('xl') {
		#{$self}__summary {
			gap: #{utility.rem(16)};
			padding: #{utility.rem(16)};

			//border-radius: max(0px, min(#{utility.rem(16)}, (100% - var(--container) + var(--ears) * -2) * 9999)) / #{utility.rem(16)};
			font-weight: 600;
			font-size: #{utility.rem(28)};

			span {
				gap: #{utility.rem(8)};
				padding: #{utility.rem(8)} #{utility.rem(12)};
				font-size: #{utility.rem(16)};

				&:deep(.icon) {
					width: #{utility.rem(16)};
				}
			}
		}
		#{$self}__content {
			padding-top: #{utility.rem(8)};
			padding-bottom: #{utility.rem(8)};
		}
	}
}
</style>
