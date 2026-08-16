import { defineStore } from 'pinia';

import { computed, queryCollection, ref } from '#imports';

export interface ModelTag {
	key: Tag;
	title: string;
	aliases: Tag[];
}

/**
 * Deliberately not derived from `PortfoliosCollectionItem`: that type carries the
 * recursive Minimark `body` tree, which we never render and which makes TypeScript
 * bail out with "type instantiation is excessively deep".
 */
export interface ModelPortfolio {
	id: string;
	title: string;
	date: Date;
	slug: string;
	openSource: boolean;
	cover?: string;
	thumbhash?: string;
	permalink?: string;
	tags: ModelTag[];
}

export enum Tag {
	HTML = 'html',
	Css = 'css',
	JavaScript = 'javascript',
	Nuxt = 'nuxt',
	Vue = 'vue',
	Scss = 'scss',
	TypeScript = 'typescript',
	PHP = 'php',
	Laravel = 'laravel',
	Wordpress = 'wordpress',
	Bitrix = 'bitrix',
	Node = 'node',
	Ffmpeg = 'ffmpeg',
	Python = 'python',
	OpenSource = 'open-source',
	AlpineJs = 'alpine-js'
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
		const data = await queryCollection('portfolios').all();
		portfolios.value = data
			.map<ModelPortfolio>((content) => {
				return {
					id: content.id,
					title: content.title,
					slug: content.slug,
					date: new Date(content.date),
					cover: content.cover,
					thumbhash: content.thumbhash,
					permalink: content.permalink,
					openSource: content.openSource ?? false,
					tags: content.tags.map((tag) => tags.get(<Tag>tag)).filter((tag): tag is ModelTag => tag !== undefined)
				};
			})
			.sort((a, b) => {
				return a.date > b.date ? -1 : 1;
			});
	};
	return { portfolios, tags: computed(() => tags), fetch };
});
