import { CreateElement, VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import Scrollbar from './main'

import { on, off } from '../utils/dom'
import { renderThumbStyle, BAR_MAP } from '../utils/util'

interface Event<T extends EventTarget> {
  currentTarget: T
  clientX: number
  clientY: number
  [key: string]: any
}

interface BarParams extends Bar {
  [key: string]: any
}

@Component
export default class Bar extends Vue {
  public $refs: {
    thumb: any,
  }

  @Prop(Boolean) private vertical: boolean
  @Prop(String) private size: string
  @Prop(Number) private move: number
  @Prop({ default: null }) private wrap: any

  private cursorDown: boolean

  get bar() {
    return BAR_MAP[this.vertical ? 'vertical' : 'horizontal']
  }
  // get wrap() {
  //   return this.$parent.wrap
  // }

  public render(h: CreateElement): VNode {
    const { size, move, bar } = this

    return (
      <div
        class={ ['el-scrollbar__bar', 'is-' + bar.key] }
        onMousedown={ this.clickTrackHandler } >
        <div
          ref='thumb'
          class='el-scrollbar__thumb'
          onMousedown={ this.clickThumbHandler }
          style={ renderThumbStyle({ size, move, bar }) }>
        </div>
      </div>
    )
  }

  private clickTrackHandler(e: Event<any>) {
    this.startDrag(e)
    const self: BarParams = this
    const client: string = this.bar.client
    const a = e.currentTarget[this.bar.offset]
    const b =  - e.currentTarget.getBoundingClientRect()[this.bar.direction]
    self[this.bar.axis] = (a - b)
  }

  private clickThumbHandler(e: Event<any>) {
    const el = this.$el as any
    const offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client])
    const key: string = this.bar.offset
    const thumbHalf = (this.$refs.thumb[key] / 2)
    const thumbPositionPercentage = ((offset - thumbHalf) * 100 / el[this.bar.offset])

    this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100)
  }

  private startDrag(e: Event<any>) {
    e.stopImmediatePropagation()
    this.cursorDown = true

    on(document, 'mousemove', this.mouseMoveDocumentHandler)
    on(document, 'mouseup', this.mouseUpDocumentHandler)
  }

  private mouseMoveDocumentHandler(e: Event<any>): any {
    if (this.cursorDown === false) { return }
    const self: BarParams = this
    const prevPage = self[this.bar.axis]

    if (!prevPage) { return }

    const el = this.$el as any
    const offset = ((el.getBoundingClientRect()[this.bar.direction]) - e[this.bar.client] * -1)
    const thumbClickPosition = (this.$refs.thumb[this.bar.offset] - prevPage)
    const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / el[this.bar.offset])

    this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100)
  }

  private mouseUpDocumentHandler(e: Event<any>) {
    const self: BarParams = this
    this.cursorDown = false
    self[this.bar.axis] = 0
    off(document, 'mousemove', this.mouseMoveDocumentHandler)
  }

  private destroyed() {
    off(document, 'mouseup', this.mouseUpDocumentHandler)
  }
}
