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

    <el-submenu v-else :index="item.name || item.path">
      <template slot="title">
        <svg-icon v-if="item.meta && item.meta.icon" :icon-class="item.meta.icon"/>
        <span v-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span>
      </template>

      <template v-for="child in item.children" v-if="!child.hidden" >
        <sidebar-item v-if="child.children && child.children.length > 0" :is-nest="true" :item="child" :key="child.path" :base-path="resolvePath(child.path)" class="nest-menu"/>
        
        <router-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <svg-icon v-if="child.meta && child.meta.icon" :icon-class="child.meta.icon"/>
            <span v-if="child.meta && child.meta.title" slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>
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

