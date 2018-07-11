<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script lang="ts">
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class PieChart extends Vue {
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
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        bottom: '10',
        data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
      },
      calculable: true,
      series: [
        {
          name: 'WEEKLY WRITE ARTICLES',
          type: 'pie',
          roseType: 'radius',
          radius: [15, 95],
          center: ['50%', '38%'],
          data: [
            { value: 320, name: 'Industries' },
            { value: 240, name: 'Technology' },
            { value: 149, name: 'Forex' },
            { value: 100, name: 'Gold' },
            { value: 59, name: 'Forecasts' }
          ],
          animationEasing: 'cubicInOut',
          animationDuration: 2600
        }
      ]
    })
  }
}
</script>

