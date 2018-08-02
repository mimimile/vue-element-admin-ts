<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <tags-view></tags-view>
      <app-main></app-main>
    </div>
  </div>
</template>

<script lang="ts">
import { Sidebar, Navbar, AppMain, TagsView } from './components'
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import ResizeMixin from './mixin/ResizeHandler'

@Component({
  components: {
    Sidebar,
    Navbar,
    AppMain,
    TagsView,
  },
})
export default class Layout extends mixins(ResizeMixin) {
  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === 'mobile',
    }
  }


  private handleClickOutside() {
    this.$store.dispatch('closeSideBar', { withoutAnimation: false })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>

