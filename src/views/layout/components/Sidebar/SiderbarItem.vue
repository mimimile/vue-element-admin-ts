<template>
  <div v-if="!item.hadden && item.children" class="menu-wrapper">

    <router-link v-if="hasOneShowingChild(item.children) && !onlyOneChild.children && !item.alwaysShow" :to="resolvePath(onlyOneChild.path)">
      <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{
        'submenu-title-noDropdown': !isNest
      }">
        <svg-icon v-if="onlyOneChild.meta && onlyOneChild.meta.icon" :icon-class="onlyOneChild.meta.icon"></svg-icon>
        <span v-if="onlyOneChild.meta && onlyOneChild.meta.title" slot="title">{{onlyOneChild.meta.title}}</span>
      </el-menu-item>
    </router-link>

  </div>
</template>

<script lang="ts">
import path from 'path'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { RouteConfigPlus } from '@/types/route'


@Component
export default class SiderbarItem extends Vue {
  @Prop({ type: Object, required: true }) private item: RouteConfigPlus
  @Prop({ default: false }) private isNest: boolean
  @Prop({ default: '' }) private basePath: string

  private onlyOneChild: RouteConfigPlus | null = null

  private hasOneShowingChild(children: RouteConfigPlus[]) {
    const showingChildren = children.filter(item => {
      if (item.hidden) {
        return false
      } else {
        this.onlyOneChild = item
        return true
      }
    })
    if (showingChildren.length === 1) {
      return true
    }
    return false
  }

  private resolvePath(...paths: string[]) {
    return path.resolve(this.basePath, ...paths)
  }
}
</script>

