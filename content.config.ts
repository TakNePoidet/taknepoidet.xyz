import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
	collections: {
		portfolios: defineCollection({
			type: 'page',
			source: 'portfolios/**/*.md',
			schema: z.object({
				date: z.date(),
				slug: z.string(),
				cover: z.string().optional(),
				thumbhash: z.string().optional(),
				permalink: z.string().optional(),
				openSource: z.boolean().optional(),
				tags: z.array(z.string())
			})
		})
	}
});
