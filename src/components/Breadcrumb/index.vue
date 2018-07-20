<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path" v-if='item.meta.title'>
        <span v-if='item.redirect === "noredirect" || index == levelList.length - 1' class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect || item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Breadcrumb extends Vue {
  private levelList: any[] = []

  @Watch('$route')
  onRouteChange() {
    this.getBreadcrumb()
  }
  
  private created(): void {
    this.getBreadcrumb()
  }

  private getBreadcrumb(): void {
    let matched: any[] = this.$route.matched.filter(item => item.name)
    const first = matched[0]
    if (first && first.name !== 'dashboard') {
      matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched)
    }
    this.levelList = matched
    console.warn('this.levelList', this.levelList)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
