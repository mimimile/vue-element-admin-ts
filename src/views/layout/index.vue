<template>
  <div class="app-wrapper">
    <div class="main=container">
      <app-main></app-main>
    </div>
  </div>
</template>

<script lang="ts">
import { AppMain } from './components'
import { Vue } from 'vue-property-decorator'

const Layout = Vue.extend({
  components: {
    AppMain,
  },
})
export default Layout
</script>
