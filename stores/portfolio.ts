import type { ParsedContent } from '@nuxt/content/dist/runtime/types';
import { defineStore } from 'pinia';

import { computed, queryContent, ref } from '#imports';

interface Content extends ParsedContent {
	date: string;
	cover?: string;
	permalink?: string;
	tags: string[];
	openSource?: boolean;
}

export interface ModelTag {
	key: Tag;
	title: string;
	aliases: Tag[];
}

export interface ModelPortfolio extends ParsedContent {
	date: Date;
	slug: string;
	cover?: string;
	thumbhash?: string;
	permalink?: string;
	tags: ModelTag[];
}

export const enum Tag {
	'HTML' = 'html',
	'Css' = 'css',
	'JavaScript' = 'javascript',
	'Nuxt' = 'nuxt',
	'Vue' = 'vue',
	'Scss' = 'scss',
	'TypeScript' = 'typescript',
	'PHP' = 'php',
	'Laravel' = 'laravel',
	'Wordpress' = 'wordpress',
	'Bitrix' = 'bitrix',
	'Node' = 'node',
	'Ffmpeg' = 'ffmpeg',
	'Python' = 'python',
	'OpenSource' = 'open-source',
	'AlpineJs' = 'alpine-js'
}

const tags = new Map<Tag, ModelTag>();
tags.set(Tag.HTML, { key: Tag.HTML, title: 'HTML', aliases: [Tag.Vue, Tag.Nuxt] });
tags.set(Tag.Css, { key: Tag.Css, title: 'Css', aliases: [Tag.Nuxt, Tag.Vue, Tag.Scss] });
tags.set(Tag.JavaScript, {
	key: Tag.JavaScript,
	title: 'JavaScript',
	aliases: [Tag.Vue, Tag.Nuxt, Tag.TypeScript]
});
tags.set(Tag.Ffmpeg, { key: Tag.Ffmpeg, title: 'Ffmpeg', aliases: [] });
tags.set(Tag.PHP, { key: Tag.PHP, title: 'PHP', aliases: [Tag.Laravel, Tag.Bitrix, Tag.Wordpress] });
tags.set(Tag.Scss, { key: Tag.Scss, title: 'Scss', aliases: [Tag.Css, Tag.Nuxt, Tag.Vue] });
tags.set(Tag.TypeScript, { key: Tag.TypeScript, title: 'TypeScript', aliases: [Tag.JavaScript] });
tags.set(Tag.AlpineJs, { key: Tag.AlpineJs, title: 'AlpineJs', aliases: [Tag.JavaScript] });
tags.set(Tag.Vue, {
	key: Tag.Vue,
	title: 'Vue',
	aliases: [Tag.TypeScript, Tag.JavaScript, Tag.HTML, Tag.Nuxt]
});
tags.set(Tag.Nuxt, {
	key: Tag.Nuxt,
	title: 'Nuxt',
	aliases: []
});
tags.set(Tag.Node, {
	key: Tag.Node,
	title: 'Node',
	aliases: [Tag.JavaScript, Tag.TypeScript]
});
tags.set(Tag.Wordpress, {
	key: Tag.Wordpress,
	title: 'Wordpress',
	aliases: [Tag.PHP]
});
tags.set(Tag.Bitrix, {
	key: Tag.Bitrix,
	title: 'Bitrix',
	aliases: [Tag.PHP]
});
tags.set(Tag.Laravel, {
	key: Tag.Laravel,
	title: 'Laravel',
	aliases: [Tag.PHP]
});
tags.set(Tag.Python, {
	key: Tag.Python,
	title: 'Python',
	aliases: []
});
tags.set(Tag.OpenSource, {
	key: Tag.OpenSource,
	title: 'OpenSource',
	aliases: []
});
export const usePortfolioStore = defineStore('portfolio', () => {
	const portfolios = ref<ModelPortfolio[]>([]);

	const fetch = async () => {
		const data = await queryContent<Content>('portfolios').find();
		portfolios.value = data
			.map((content) => {
				return {
					...content,
					date: new Date(content.date),
					openSource: content.openSource ?? false,
					tags: content.tags.map((tag) => tags.get(<Tag>tag))
				} as ModelPortfolio;
			})
			.sort((a, b) => {
				return a.date > b.date ? -1 : 1;
			});
	};
	return { portfolios, tags: computed(() => tags), fetch };
});
