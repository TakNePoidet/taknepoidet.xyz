<script setup lang="ts">
import {
	Icon,
	Icon24Email,
	Icon24Github,
	Icon24Instagram,
	Icon24Phone,
	Icon24Telegram,
	Icon24Vk,
	Icon24Whatsapp,
	Icon32Email,
	Icon32Github,
	Icon32Instagram,
	Icon32Phone,
	Icon32Telegram,
	Icon32Vk,
	Icon32Whatsapp
} from '~/components/ui/icons';
import TheSection from '~/components/TheSection.vue';
import TheIcon from '~/components/elements/TheIcon.vue';
import { computed, useIsSmallDisplay } from '#imports';

interface ContactItem {
	icon: Icon;
	key: string;
	name: string;
	value: string;
}

const isSmallDisplay = useIsSmallDisplay();
const items = computed<ContactItem[]>(() => [
	{ key: 'vk', name: 'ВКонтакте', value: 'https://vk.com/taknepoidet', icon: isSmallDisplay ? Icon24Vk : Icon32Vk },
	{
		key: 'whatsapp',
		name: 'WhatsApp',
		value: 'https://wa.me/+79177747838',
		icon: isSmallDisplay ? Icon24Whatsapp : Icon32Whatsapp
	},
	{
		key: 'telegram',
		name: 'Telegram',
		value: 'https://t.me/TakNePoidet',
		icon: isSmallDisplay ? Icon24Telegram : Icon32Telegram
	},
	{
		key: 'phone',
		name: 'Телефон',
		value: 'tel:+79177747838',
		icon: isSmallDisplay ? Icon24Phone : Icon32Phone
	},
	{
		key: 'github',
		name: 'GitHub',
		value: 'https://github.com/TakNePoidet',
		icon: isSmallDisplay ? Icon24Github : Icon32Github
	},
	{
		key: 'instagram',
		name: 'Фотографии',
		value: 'https://www.instagram.com/tak_ne_poideet',
		icon: isSmallDisplay ? Icon24Instagram : Icon32Instagram
	},
	{
		key: 'email',
		name: 'Почта',
		value: 'mailto:yakin95@gmail.com',
		icon: isSmallDisplay ? Icon24Email : Icon32Email
	}
]);
</script>

<template>
	<the-section class="section-contacts" title="Найти меня или связаться со мной">
		<ul class="section-contacts-content">
			<li v-for="item in items" :key="item.key" :data-key="item.key">
				<span>
					<the-icon :icon="item.icon" />
				</span>
				<nuxt-link rel="noopener noreferrer" target="_blank" :href="item.value">{{ item.name }}</nuxt-link>
			</li>
		</ul>
	</the-section>
</template>

<style lang="scss">
@use 'assets/style/utility';

.section-contacts {
	margin: 0 auto;

	.section-contacts-content {
		display: flex;
		flex-wrap: wrap;
		gap: #{utility.rem(64)};
		align-content: center;
		justify-content: center;
		margin: 0;
		padding: 0;
		list-style: none;

		@media screen and (width > 1424px) {
			padding: 0 5%;
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

		@media screen and (width <= 1424px) {
			display: block;
			gap: #{utility.rem(0)};
			justify-content: start;

			li {
				justify-content: flex-start;
				font-size: #{utility.rem(16)};

				&:not(:first-child) {
					padding: #{utility.rem(16)} 0;
					border-top: 1px solid var(--base-border);
				}

				&:first-child {
					padding-bottom: #{utility.rem(16)};
				}

				&:last-child {
					padding-top: #{utility.rem(16)};
				}

				span {
					width: #{utility.rem(40)};
					height: #{utility.rem(40)};

					.icon {
						width: #{utility.rem(24)};
						height: #{utility.rem(24)};
					}
				}
			}
		}
	}
}
</style>
