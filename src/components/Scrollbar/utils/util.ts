export const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top',
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left',
  },
}

export function renderThumbStyle(params: { move: number, size: string, bar: any }) {
  const style: any = {}
  const translate = `translate${params.bar.axis}(${ params.move }%)`

  style[params.bar.size] = params.size
  style.transform = translate
  style.msTransform = translate
  style.webkitTransform = translate

  return style
}
