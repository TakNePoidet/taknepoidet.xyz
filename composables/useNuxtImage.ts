import type { Img } from '@nuxt/image-edge';
import { useImage } from '#imports';

export function useNuxtImage() {
	return useImage() as Img;
}
