<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF">
      <sidebar-item v-for="route in permissionRouters" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SidebarItem from './SiderbarItem.vue'
// import Scrollbar from '@/components/Scrollbar' // 这个组件还存在很多问题

@Component({
  components: {
    SidebarItem,
    // Scrollbar,
  },
})
export default class Sidebar extends Vue {
  get permissionRouters() {
    return this.$store.state.permission.addRouters
  }

  get sidebar() {
    return this.$store.state.app.sidebar
  }

  get isCollapse() {
    return !this.sidebar.opened
  }
}
</script>

