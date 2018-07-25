<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{left: left + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const padding = 15 // tag's padding

@Component
export default class ScrollPane extends Vue {
  public $refs: {
    scrollContainer: HTMLElement
    scrollWrapper: HTMLElement
  }
  
  private left: number = 0

  private handleScroll(e: WheelEvent) {
    const eventDelta = e.wheelDelta || -e.deltaY * 3
    const $container = this.$refs.scrollContainer
    const $containerWidth = $container.offsetWidth
    const $wrapper = this.$refs.scrollWrapper
    const $wrapperWidth = $wrapper.offsetWidth

    if (eventDelta > 0) {
      this.left = Math.min(0, this.left + $wrapperWidth)
    } else {
      if ($containerWidth - padding < $wrapperWidth) {
        if (this.left < -($wrapperWidth - $containerWidth + padding)) {
          this.left = this.left
        } else {
          this.left = Math.max(this.left + eventDelta, $containerWidth - $wrapperWidth - padding)
        }
      } else {
        this.left = 0
      }
    }
  }

  public moveToTarget($target: HTMLElement) {
    const $container = this.$refs.scrollContainer
    const $containerWidth = $container.offsetWidth
    const $targetLeft = $target.offsetLeft
    const $targetWidth = $target.offsetWidth

    if ($targetLeft < -this.left) {
      // 标签在左边
      this.left = -$targetLeft + padding
    } else if ($targetLeft + padding > -this.left && $targetLeft + $targetWidth < -this.left + $containerWidth - padding) {
      // 标签在当前视图
    } else {
      // 标签在右边
      this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  .scroll-wrapper {
    position: absolute;
  }
}
</style>
