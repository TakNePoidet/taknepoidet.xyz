import type { Img } from '@nuxt/image';

import { useImage } from '#imports';

export function useNuxtImage() {
	return useImage() as Img;
}
