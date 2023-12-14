import tractor from './tractor.svg';

interface Config {
	iconColor: string;
	iconSize: number;
	icon: string;
	snowPlowImage: string;
	showSnowBalls: boolean;
	showSnowBallsIsMobile: boolean;
	showSnowflakes: boolean;
	countSnowflake: number;
	snowBallsLength: number;
	snowBallIterations: number;
	snowBallupNum: number;
	snowBallIterationsInterval: number;
	clearSnowBalls: number;
	reset: number;
}

export class Snow {
	readonly #icon;
	readonly #snowPlowImage;

	readonly #countSnowflake;
	#snowBallsLength;
	#snowBallIterations;

	#snowBallupNum;
	#snowBallIterationsInterval;
	#clearSnowBalls;
	#reset;

	#showSnowBalls;
	#showSnowBallsIsMobile;
	#showSnowflakes;

	#$snowflakesBox: HTMLElement = document.createElement('div');
	#$snowBallBox: HTMLElement = document.createElement('div');
	#$layer: HTMLElement = document.createElement('div');
	#$snowBallWrap: HTMLElement = document.createElement('div');
	#$snowBall: HTMLCollectionOf<HTMLAnchorElement> = this.#$snowBallWrap.getElementsByTagName('a');
	#$snowPlow: HTMLElement = document.createElement('div');

	#windowInnerWidth = window.innerWidth;

	#destruction = false;

	constructor(config: Partial<Config> = {}) {
		const {
			iconColor = '#a6e7ff',
			iconSize = 15,
			icon = `<svg fill="${iconColor}" xmlns="http://www.w3.org/2000/svg" width="${iconSize}px" height="${iconSize}px" viewBox="0 0 50 50"><path d="M24.97-.03A2 2 0 0 0 23 2v4.17l-1.9-1.89a2 2 0 0 0-1.43-.6 2 2 0 0 0-1.39 3.43L23 11.83v9.7l-8.4-4.85-1.74-6.46a2 2 0 0 0-1.9-1.51A2 2 0 0 0 9 11.25l.7 2.6-3.64-2.1a2 2 0 0 0-.95-.28 2 2 0 0 0-1.05 3.75l3.63 2.1-2.57.69a2 2 0 1 0 1.04 3.86l6.43-1.72L21.02 25l-8.41 4.85-6.4-1.72a2 2 0 0 0-.6-.07A2 2 0 0 0 5.18 32l2.53.67-3.64 2.1a2 2 0 1 0 2 3.47l3.63-2.1-.67 2.5a2 2 0 1 0 3.87 1.04l1.7-6.36L23 28.5v9.68l-4.68 4.68a2 2 0 1 0 2.83 2.83L23 43.83V48a2 2 0 1 0 4 0v-4.17l1.88 1.87a2 2 0 1 0 2.82-2.83l-4.7-4.7v-9.7l8.4 4.85 1.74 6.46A2 2 0 1 0 41 38.75l-.7-2.6 3.64 2.1a2 2 0 1 0 2-3.47l-3.64-2.1 2.56-.68a2 2 0 0 0-.5-3.94 2 2 0 0 0-.54.07l-6.41 1.72-8.38-4.83 8.43-4.86 6.38 1.7a2 2 0 1 0 1.03-3.85l-2.5-.68 3.57-2.05a2 2 0 0 0-.91-3.75 2 2 0 0 0-1.1.28l-3.64 2.1.7-2.6a2 2 0 0 0-2.03-2.54 2 2 0 0 0-1.84 1.51l-1.73 6.46L27 21.57v-9.74l4.72-4.72a2 2 0 1 0-2.83-2.83L27 6.18V2a2 2 0 0 0-2.03-2.03z"/></svg>`,
			snowPlowImage = `<img src="${tractor}" alt="">`,
			showSnowBalls = true,
			showSnowBallsIsMobile = true,
			showSnowflakes = true,
			countSnowflake = 100,
			snowBallsLength = 10,
			snowBallIterations = 40,
			snowBallupNum = 1,
			snowBallIterationsInterval = 1000,
			clearSnowBalls = 20000,
			reset = -6
		} = config;

		this.#icon = icon;
		this.#snowPlowImage = snowPlowImage;
		this.#showSnowBalls = showSnowBalls;
		this.#showSnowBallsIsMobile = showSnowBallsIsMobile;
		this.#showSnowflakes = showSnowflakes;
		this.#countSnowflake = countSnowflake > 100 ? 100 : countSnowflake;
		this.#snowBallsLength = snowBallsLength > 10 ? 10 : snowBallsLength;
		this.#snowBallIterations = snowBallIterations;
		this.#snowBallupNum = snowBallupNum > 3 ? 3 : snowBallupNum;
		this.#snowBallIterationsInterval = snowBallIterationsInterval;
		this.#clearSnowBalls = clearSnowBalls;
		this.#reset = reset;

		if (this.#snowBallIterations < 10 && this.#snowBallupNum < 4) {
			this.#snowBallIterations = 10;
		} else if (this.#snowBallIterations > 40 && this.#snowBallupNum > 2) {
			this.#snowBallIterations = 40;
		}

		this.#init();
	}

	#init() {
		window.addEventListener('resize', this.#resize.bind(this));

		this.#$snowflakesBox.className = 'snowflakes-box';
		this.#$snowBallBox.className = 'snowball-box';
		this.#$layer.className = 'snow-layer';
		this.#$snowBallWrap.className = 'snowball-wrap';
		this.#$snowPlow.className = 'snow-plow-img';
		this.#$snowPlow.innerHTML = this.#snowPlowImage;

		// APPEND ELEMENTS ON THE PAGE
		if (this.#showSnowflakes == true) {
			document.body.appendChild(this.#$snowflakesBox);
		}

		this.#createSnowflakes();
		this.#checkWindowWidth();

		if (this.#$snowBall.length) {
			for (const item of this.#$snowBall) {
				const w = item.clientWidth;
				item.style.height = w + 'px';
			}
		}

		this.#activateSnowBallsChangeTranslate();
	}

	#resize() {
		this.#windowInnerWidth = window.innerWidth;
		this.#$snowflakesBox.innerHTML = '';
		this.#$snowBallBox.innerHTML = '';

		this.#createSnowflakes();
		this.#checkWindowWidth();
	}

	clear() {
		return new Promise<void>((resolve) => {
			this.#$layer.classList.add('up-max');

			setTimeout(async () => {
				await this.#activateAnimate();
				resolve();
			}, this.#clearSnowBalls);
		});
	}

	async destroy() {
		this.#destruction = true;
		this.#$layer.classList.add('up-max');
		this.#$snowflakesBox.classList.add('hide');
		await this.#activateAnimate();
		window.removeEventListener('resize', this.#resize);
		window.removeEventListener('resize', this.#resize);
		this.#$snowflakesBox.remove();
		this.#$snowBallBox.remove();
	}

	// ACTIVATE SNOWBALLS POSITION
	#activateSnowBallsChangeTranslate() {
		let iterations = 0;
		// eslint-disable-next-line prefer-const
		let interval: number | NodeJS.Timeout;

		const snowBallsChangeTranslate = () => {
			iterations++;
			if (iterations >= this.#snowBallIterations) {
				clearInterval(interval);
				void this.clear();
			}

			if (this.#destruction) {
				clearInterval(interval);
			}
			for (const $snowBallEl of this.#$snowBall) {
				const style = window.getComputedStyle($snowBallEl);
				const matrix = new DOMMatrix(style.transform);
				const transformMatrixY = matrix.m42;
				const snowBallupNumM = -this.#snowBallupNum;
				const up = transformMatrixY + snowBallupNumM;

				$snowBallEl.style.transform = 'translateY(' + up + 'px )';
			}
		};

		interval = setInterval(snowBallsChangeTranslate, this.#snowBallIterationsInterval);
	}

	#activateAnimate() {
		return new Promise<void>((resolve) => {
			if (this.#$layer.classList.contains('up-max')) {
				for (const $snowBallEl of this.#$snowBall) {
					if (!$snowBallEl.classList.contains('active')) $snowBallEl.classList.add('active');

					if (!this.#$snowPlow.classList.contains('active')) this.#$snowPlow.classList.add('active');

					$snowBallEl.onanimationend = () => {
						$snowBallEl.style.transform = 'translateY(' + this.#reset + 'px )';
						this.#$snowPlow.classList.remove('active');
						setTimeout(() => {
							if (!this.#destruction) {
								if ($snowBallEl.classList.contains('active')) {
									$snowBallEl.classList.remove('active');
								}
								this.#$layer.classList.remove('up-max');
								this.#activateSnowBallsChangeTranslate();
							}

							resolve();
						}, 1000);
					};

					this.#$snowPlow.onanimationend = () => {
						this.#$snowPlow.classList.remove('active');
					};
				}
			}
		});
	}

	// CREATE SNOWFLAKES
	#createSnowflakes() {
		for (let i = 0; i < this.#countSnowflake; i++) {
			const snowflake = document.createElement('span');

			snowflake.className = 'snowflake';
			snowflake.innerHTML = this.#icon;
			this.#$snowflakesBox.appendChild(snowflake);
		}
	}

	#createSnowBallsBox() {
		this.#$layer.appendChild(this.#$snowBallWrap);
		this.#$snowBallBox.appendChild(this.#$layer);
		document.body.appendChild(this.#$snowBallBox);
	}

	// CREATE SNOWBALLS
	#createSnowBalls() {
		if (this.#$snowBallWrap.children.length !== 0) {
			return;
		}

		for (let i = 0; i < this.#snowBallsLength; i++) {
			const $snowBall = document.createElement('a');
			$snowBall.innerHTML = `${this.#icon}${this.#icon}`;
			this.#$snowBallWrap.appendChild($snowBall);
		}

		this.#$snowBallWrap.appendChild(this.#$snowPlow);
	}

	// CHECK WINDOW WIDTH FOR CREATE SnowBallsBox
	#checkWindowWidth() {
		if (!this.#showSnowBalls) {
			return;
		}

		if (!this.#showSnowBallsIsMobile) {
			if (this.#windowInnerWidth > 1024) {
				this.#createSnowBallsBox();
				this.#createSnowBalls();
			}
			return;
		}

		if (this.#windowInnerWidth < 1024) {
			if (this.#snowBallIterations > 20) {
				this.#snowBallIterations = 20;
			}

			if (this.#snowBallsLength > 3) {
				this.#snowBallsLength = 3;
			}

			if (this.#snowBallupNum > 2) {
				this.#snowBallupNum = 2;
			}
		}

		this.#createSnowBallsBox();
		this.#createSnowBalls();
	}
}
