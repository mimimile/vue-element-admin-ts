import { CreateElement, VNode } from 'vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { toObject } from '@/utils'
import scrollbarWidth from '../utils/scrollbar-width'
import { addResizeListener, removeResizeListener } from '../utils/resize-event'
import Bar from './bar'

@Component({
  components: {
    Bar,
  },
})
export default class Scrollbar extends Vue {
  @Prop(Boolean) private native!: boolean
  @Prop({ default: null }) private wrapStyle: any
  @Prop({ default: {} }) private wrapClass: any
  @Prop({ default: null }) private viewClass: object
  @Prop({ default: null }) private viewStyle: object
  @Prop(Boolean) private noresize!: boolean
  @Prop({ default: 'div' }) private tag: string

  private sizeWidth: string = '0'
  private sizeHeight: string = '0'
  private moveX: number = 0
  private moveY: number = 0

  get wrap() {
    return this.$refs.wrap as Element
  }

  public render(h: CreateElement): VNode {
    const gutter = scrollbarWidth()
    let style = this.wrapStyle

    if (gutter) {
      const gutterWidth = `-${gutter}px`
      const gutterStyle = `margin-button: ${gutterWidth}; margin-right: ${gutterWidth}`

      if (Array.isArray(this.wrapStyle)) {
        style = toObject(this.wrapStyle)
        style.marginRight = style.marginBottom = gutterWidth
      } else if (typeof this.wrapStyle === 'string') {
        style += gutterStyle
      } else {
        style = gutterStyle
      }
    }
    const view = h(this.tag, {
      class: ['scrollbar__view', this.viewClass],
      style: this.viewStyle,
      ref: 'resize',
    }, this.$slots.default)
    const wrap = (
      <div
        ref='wrap'
        style={ style }
        onScroll={ this.handleScroll }
        class={ [this.wrapClass, 'scrollbar__wrap', gutter ? '' : 'scrollbar__wrap--hidden-default'] }>
        { [view] }
      </div>
    )
    let nodes: JSX.Element[]

    if (!this.native) {
      nodes = ([
        wrap,
        <bar
          move={ this.moveX }
          wrap
          size={ this.sizeWidth }></bar>,
        <bar
          vertical
          wrap
          move={ this.moveY }
          size={ this.sizeHeight }></bar>,
      ])
    } else {
      nodes = ([
        <div
          ref='wrap'
          class={ [this.wrapClass, 'scrollbar__wrap'] }
          style={ style }>
          { [view] }
        </div>,
      ])
    }
    return h('div', { class: 'scrollbar' }, nodes)
  }

  private handleScroll() {
    const wrap = this.wrap

    this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight)
    this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth)
  }

  private update() {
    let heightPercentage: number
    let widthPercentage: number
    const wrap = this.wrap
    if (!wrap) { return }

    heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight)
    widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth)

    this.sizeHeight = (heightPercentage < 100) ? `${heightPercentage}%` : ''
    this.sizeWidth = (widthPercentage < 100) ? `${widthPercentage}%` : ''
  }

  private mounted() {
    if (this.native) { return }
    this.$nextTick(this.update)
    if (!this.noresize) { addResizeListener(this.$refs.resize as HTMLElement, this.update) }
  }

  private beforeDestroy() {
    if (this.native) { return }
    if (!this.noresize) { removeResizeListener(this.$refs.resize, this.update) }
  }
}
