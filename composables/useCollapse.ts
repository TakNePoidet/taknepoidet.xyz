import { ref, templateRef, useSignal } from '#imports';

export function useCollapse(initial: boolean = false) {
	const $container = templateRef<HTMLDetailsElement>('$container');
	const $content = templateRef<HTMLElement>('$content');
	const $summary = templateRef<HTMLElement>('$summary');

	const [isOpen, setIsOpen] = useSignal<boolean>(initial);
	const isClosing = ref(false);
	const isExpanding = ref(false);
	const animation = ref<null | Animation>();

	function opened() {
		if (!$container.value || !$summary.value) {
			return;
		}
		$container.value.style.height = `${$container.value.offsetHeight}px`;
		setIsOpen(true);
		requestAnimationFrame(() => expand());
	}

	function shrink() {
		isClosing.value = true;
		if (!$container.value || !$summary.value) {
			return;
		}
		const startHeight = `${$container.value.offsetHeight}px`;
		const endHeight = `${$summary.value.offsetHeight}px`;

		if (typeof animation.value !== 'undefined') {
			animation.value?.cancel();
		}
		animation.value = $container.value.animate(
			{
				height: [startHeight, endHeight]
			},
			{
				duration: 400,
				easing: 'ease-in-out'
			}
		);
		animation.value.onfinish = () => {
			onAnimationFinish(false);
		};
		animation.value.oncancel = () => {
			isClosing.value = false;
		};
	}

	function expand() {
		isExpanding.value = true;
		if (!$container.value || !$summary.value || !$content.value) {
			return;
		}
		const startHeight = `${$container.value.offsetHeight}px`;
		const endHeight = `${$summary.value.offsetHeight + $content.value.offsetHeight}px`;

		if (typeof animation.value !== 'undefined') {
			animation.value?.cancel();
		}
		animation.value = $container.value?.animate(
			{
				height: [startHeight, endHeight]
			},
			{
				duration: 400,
				easing: 'ease-in-out'
			}
		);
		animation.value.onfinish = () => {
			onAnimationFinish(true);
		};
		animation.value.oncancel = () => {
			isClosing.value = false;
		};
	}

	function onAnimationFinish(open: boolean) {
		setIsOpen(open);
		isExpanding.value = false;
		isClosing.value = false;
		if ($container.value) {
			$container.value.style.height = '';
			$container.value.style.overflow = 'revert';
		}
	}

	function toggle() {
		if ($container.value) {
			$container.value.style.overflow = 'hidden';
			if (isClosing.value || !$container.value.open) {
				opened();
			} else if (isExpanding.value || $container.value.open) {
				shrink();
			}
		}
	}

	return {
		isOpen,
		toggle,
		$container,
		$content,
		$summary
	};
}
