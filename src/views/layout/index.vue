<template>
  <div class="app-wrapper">
    <div class="main=container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script lang="ts">
import { Navbar, AppMain } from './components'
import { Vue } from 'vue-property-decorator'

const Layout = Vue.extend({
  components: {
    Navbar,
    AppMain,
  },
})
export default Layout
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

