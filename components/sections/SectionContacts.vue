<script setup lang="ts">
import { computed } from '#imports';
import BaseSection from '~/components/BaseSection.vue';
import BaseIcon from '~/components/elements/BaseIcon.vue';
import MotionScroll from '~/components/utils/MotionScroll.vue';

interface ContactItem {
	key: string;
	name: string;
	value: string;
}

const items = computed<ContactItem[]>(() => [
	{ key: 'vk', name: 'ВКонтакте', value: 'https://vk.com/taknepoidet' },
	{
		key: 'whatsapp',
		name: 'WhatsApp',
		value: 'https://wa.me/+79177747838'
	},
	{
		key: 'telegram',
		name: 'Telegram',
		value: 'https://t.me/TakNePoidet'
	},
	{
		key: 'phone',
		name: 'Телефон',
		value: 'tel:+79177747838'
	},
	{
		key: 'github',
		name: 'GitHub',
		value: 'https://github.com/TakNePoidet'
	},
	{
		key: 'instagram',
		name: 'Фотографии',
		value: 'https://www.instagram.com/tak_ne_poideet'
	},
	{
		key: 'email',
		name: 'Почта',
		value: 'mailto:yakin95@gmail.com'
	}
]);
</script>

<template>
	<motion-scroll>
		<base-section class="section-contacts" title="Найти меня или связаться со мной">
			<ul class="section-contacts-content">
				<li v-for="item in items" :key="item.key" :data-key="item.key">
					<span>
						<base-icon :name="item.key" />
					</span>
					<nuxt-link rel="noopener noreferrer" target="_blank" :href="item.value">
						{{ item.name }}
					</nuxt-link>
				</li>
			</ul>
		</base-section>
	</motion-scroll>
</template>

<style scoped lang="scss">
@use 'assets/style/utility';
@use 'assets/style/breakpoints';

.section-contacts {
	margin: 0 auto;

	.section-contacts-content {
		display: flex;
		flex-wrap: wrap;
		gap: #{utility.rem(64)};
		place-content: center center;
		margin: 0;
		padding: 0;
		list-style: none;

		@include breakpoints.media-up('xxl') {
			padding: 0 15%;
		}

		li {
			position: relative;
			display: flex;
			gap: #{utility.rem(16)};
			justify-content: center;
			align-items: center;
			font-weight: 500;
			font-size: #{utility.rem(32)};
			line-height: 130%;

			a {
				color: var(--primary-text);
				text-decoration: none;
				transition:
					color var(--transition-animation),
					text-decoration var(--transition-animation);

				&::after {
					content: '';
					position: absolute;
					inset: 0;
				}
			}

			span {
				display: flex;
				justify-content: center;
				align-items: center;
				width: #{utility.rem(64)};
				height: #{utility.rem(64)};
				border-radius: 50%;

				.icon {
					width: #{utility.rem(32)};
					height: #{utility.rem(32)};
					color: var(--white);
				}
			}

			&[data-key='vk'] {
				color: var(--brand-vk);

				span {
					background-color: currentcolor;
				}
			}

			&[data-key='whatsapp'] {
				color: var(--brand-whatsapp);

				span {
					background-color: currentcolor;
				}
			}

			&[data-key='telegram'] {
				color: var(--brand-telegram);

				span {
					background-color: currentcolor;
				}
			}

			&[data-key='phone'] {
				color: var(--brand-phone);

				span {
					background-color: currentcolor;
				}
			}

			&[data-key='github'] {
				color: var(--brand-gitgub);

				span {
					background-color: currentcolor;
				}
			}

			&[data-key='instagram'] {
				color: var(--brand-instagram);

				span {
					background-color: currentcolor;
				}
			}

			&[data-key='email'] {
				color: var(--brand-gmail);

				span {
					background-color: currentcolor;
				}
			}

			@media (hover: hover) {
				&:hover,
				&:focus-visible {
					a {
						color: currentcolor;
						text-decoration: underline;
					}
				}
			}
		}

		@include breakpoints.media-down('xl') {
			display: block;
			gap: #{utility.rem(0)};
			justify-content: start;

			li {
				gap: #{utility.rem(12)};
				justify-content: flex-start;
				font-size: #{utility.rem(20)};

				&:not(:first-child) {
					padding: #{utility.rem(12)} 0;
					border-top: 1px solid var(--base-border);
				}

				&:first-child {
					padding-bottom: #{utility.rem(12)};
				}

				&:last-child {
					padding-top: #{utility.rem(12)};
				}

				span {
					width: #{utility.rem(40)};
					height: #{utility.rem(40)};

					.icon {
						width: #{utility.rem(20)};
						height: #{utility.rem(20)};
					}
				}
			}
		}
	}
}
</style>
