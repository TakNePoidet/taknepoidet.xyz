<script setup lang="ts">
import BaseSection from '~/components/BaseSection.vue';
import BasePicture from '~/components/elements/BasePicture.vue';
import MotionScroll from '~/components/utils/MotionScroll.vue';
</script>

<template>
	<base-section class="section-hero">
		<div class="section-hero-content">
			<div class="section-hero-content__title">
				<h1>Якин <u>Никита</u></h1>
				<h2>Привет, меня зовут</h2>
			</div>
			<div class="section-hero-content__gallery">
				<div>
					<base-picture
						preload
						src="/images/page/home/image.jpg"
						:width="2529"
						:height="1560"
						alt="Моя фотография 1"
						thumbhash="HggGDIJgXa9WanlbeGz9ffg0OQ=="
					/>
				</div>
				<div>
					<base-picture
						src="/images/page/home/IMG_9435.jpg"
						:width="1248"
						:height="1560"
						alt="Моя фотография 2"
						thumbhash="ljgGDgROVfSFiAh3iZmHdGmHALMTA2s="
					/>
				</div>
				<motion-scroll>
					<base-picture
						src="/images/page/home/IMG_6615.jpg"
						:width="1248"
						:height="1560"
						alt="Моя фотография 3"
						thumbhash="5ScGHgKoufm7Vnc1qXRXeViIVZAIQ2c="
					/>
				</motion-scroll>
				<motion-scroll>
					<base-picture
						src="/images/page/home/IMG_9436.jpg"
						:width="2529"
						:height="1560"
						alt="Моя фотография 4"
						thumbhash="XxgGPgZIbbTkeUgLhoBXfpknWICVAzc="
					/>
				</motion-scroll>
				<motion-scroll>
					<base-picture
						src="/images/page/home/IMG_9434.jpg"
						:width="2529"
						:height="1560"
						alt="Моя фотография 5"
						thumbhash="5zgKFgSPhWObaaiXaWp1nFZ3NEUPd7M="
					/>
				</motion-scroll>
			</div>

			<motion-scroll id="about" class="section-hero-content__text">
				<p>
					Я&nbsp;&mdash; Fullstack-разработчик, люблю фотографировать, кататься на&nbsp;велосипеде и&nbsp;всякое-разное
				</p>
				<p>Тут вы&nbsp;можете больше узнать обо мне и&nbsp;увидеть некоторые мои проекты</p>
			</motion-scroll>
		</div>
	</base-section>
</template>

<style scoped lang="scss">
@use 'assets/style/utility';
@use 'assets/style/breakpoints';

.section-hero {
	.section-hero-content {
		$self: '.section-hero-content';

		display: grid;
		gap: #{utility.rem(32)};
		& #{$self}__title {
			display: grid;
			gap: #{utility.rem(8)};

			h1 {
				order: 99;
				color: var(--brand-color);
				font-weight: 800;
				font-size: #{utility.rem(128)};
				line-height: 100%;
				text-align: center;
			}

			h2 {
				color: var(--primary-text);
				font-weight: 500;
				font-style: normal;
				font-size: #{utility.rem(64)};
				line-height: 130%;
			}
		}

		& #{$self}__gallery {
			display: grid;
			grid-template-rows: repeat(#{utility.rem(770)});
			grid-template-columns: repeat(3, 1fr);
			gap: #{utility.rem(16)};

			> div {
				:deep(.picture) {
					height: 100%;
					border: 1px solid var(--base-border);
					border-radius: #{utility.rem(16)};

					img {
						object-fit: cover;
						width: 100%;
						height: 100%;
					}
				}

				&:first-child {
					grid-column: 1 / 3;
				}

				@include breakpoints.media-down('xl') {
					&:not(:first-child) {
						:deep(.picture) {
							img {
								aspect-ratio: 4/ 5 !important;
							}
						}
					}
				}
			}
		}
		& #{$self}__text {
			p {
				color: var(--primary-text);
				font-weight: 500;
				font-size: #{utility.rem(32)};
				line-height: 130%;
			}

			p + p {
				margin-top: #{utility.rem(42)};
			}
		}

		@include breakpoints.media-down('xl') {
			gap: #{utility.rem(16)};
			& #{$self}__title {
				gap: #{utility.rem(8)};

				h1 {
					font-size: #{utility.rem(48)};
				}

				h2 {
					font-size: #{utility.rem(20)};
				}
			}
			& #{$self}__gallery {
				grid-template-columns: repeat(2, 1fr);
				gap: #{utility.rem(4)};

				> div {
					&:first-child {
						grid-column: 1/-1;
					}

					:deep(.picture) {
						border-radius: #{utility.rem(4)};
					}
				}
			}
			& #{$self}__text {
				p {
					font-size: #{utility.rem(20)};
				}

				p + p {
					margin-top: #{utility.rem(26)};
				}
			}
		}
	}
}
</style>
