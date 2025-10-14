export function getScrollbarWidth(): number {
    const outer = document.createElement('div');

    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';

    (outer.style as any).msOverflowStyle = 'scrollbar';

    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;


    if (outer.parentNode) {
        outer.parentNode.removeChild(outer);
    }

    return scrollbarWidth;
}
