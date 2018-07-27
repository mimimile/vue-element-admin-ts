import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { AppSidebar, AppDevice } from '@/types/vuex'

const { body } = document
const WIDTH = 1024
const RATIO = 3

@Component
export default class ResizeHandler extends Vue {
  get sidebar() {
    return this.$store.state.app.sidebar
  }
  get device() {
    return this.$store.state.app.device
  }

  @Watch('$route')
  private onRouteChange(route: Route) {
    if (this.device === 'mobile' && this.sidebar.opened) {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }

  private beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  }

  private mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      this.$store.dispatch('toggleDevice', 'mobile')
      this.$store.dispatch('closeSideBar', { withoutAnimation: true })
    }
  }

  private isMobile(): boolean {
    const rect = body.getBoundingClientRect()
    return rect.width - RATIO < WIDTH
  }

  private resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile()
      this.$store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')

      if (isMobile) {
        this.$store.dispatch('closeSideBar', { withoutAnimation: true })
      }
    }
  }
}
