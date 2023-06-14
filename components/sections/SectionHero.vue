<script setup lang="ts">
import TheSection from '~/components/TheSection.vue';
import ThePicture from '~/components/elements/ThePicture.vue';
</script>

<template>
	<the-section class="section-hero">
		<div class="section-hero-content">
			<div class="section-hero-content__title">
				<h1>Якин <u>Никита</u></h1>
				<h2>Привет, меня зовут</h2>
			</div>
			<the-picture
				preload
				class="section-hero-content__image"
				src="/images/page/home/me.jpg"
				:width="2720"
				:height="1802"
				alt="Моя фотография"
			/>
			<div class="section-hero-content__text">
				<p>
					Я&nbsp;&mdash; Fullstack-разработчик, люблю фотографировать, кататься на&nbsp;велосипеде и&nbsp;всякое-разное
				</p>
				<p>Тут вы&nbsp;можете больше узнать обо мне и&nbsp;увидеть некоторые мои проекты</p>
			</div>
		</div>
	</the-section>
</template>

<style lang="scss">
@use 'assets/style/utility';

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
				font-size: #{utility.rem(64)};
				font-style: normal;
				line-height: 130%;
			}
		}
		& #{$self}__image {
			margin: 0 calc(var(--ears) * -1);

			img {
				width: 100%;
				height: auto;
				object-fit: cover;
				border-radius: #{utility.rem(32)};
				box-shadow: 0 #{utility.rem(2.2222)} #{utility.rem(42.2222)} rgb(0 0 0 / 10%),
					0 #{utility.rem(0.8559)} #{utility.rem(13.4486)} rgb(0 0 0 / 6.07%),
					0 #{utility.rem(0.181)} #{utility.rem(3.4403)} rgb(0 0 0 / 3.93%);
				aspect-ratio: 16/ 9;
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

		@media screen and (width <= 1424px) {
			gap: #{utility.rem(16)};
			& #{$self}__title {
				gap: #{utility.rem(8)};

				h1 {
					font-size: #{utility.rem(32)};
				}

				h2 {
					font-size: #{utility.rem(16)};
				}
			}
			& #{$self}__image {
				img {
					border-radius: max(0px, min(#{utility.rem(8)}, (100% - var(--container)) * 9999)) / #{utility.rem(8)};
				}
			}
			& #{$self}__text {
				p {
					font-size: #{utility.rem(16)};
				}

				p + p {
					margin-top: #{utility.rem(20.8)};
				}
			}
		}
	}
}
</style>
