<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script lang="ts">
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { Component, Vue, Prop } from 'vue-property-decorator'

const animationDuration = 6000

@Component
export default class BarChart extends Vue {
  @Prop({ default: 'chart' }) private className!: string
  @Prop({ default: '100%' }) private width!: string
  @Prop({ default: '300px' }) private height!: string

  private chart: any = null
  private resizeHanlder: any = null

  private mounted(): void {
    this.initChart()
    this.resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.resizeHanlder)
  }

  private beforeDestroy(): void {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.resizeHanlder)
    this.chart.dispose()
    this.chart = null
  }

  private initChart(): void {
    const el = this.$el as HTMLDivElement | HTMLCanvasElement
    this.chart = echarts.init(el, 'macarons')

    this.chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: 10,
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        }
      }],
      series: [{
        name: 'pageA',
        type: 'bar',
        stack: 'vistors',
        barWidth: '60%',
        data: [79, 52, 200, 334, 390, 330, 220],
        animationDuration
      }, {
        name: 'pageB',
        type: 'bar',
        stack: 'vistors',
        barWidth: '60%',
        data: [80, 52, 200, 334, 390, 330, 220],
        animationDuration
      }, {
        name: 'pageC',
        type: 'bar',
        stack: 'vistors',
        barWidth: '60%',
        data: [30, 52, 200, 334, 390, 330, 220],
        animationDuration
      }]
    })
  }
}
</script>

