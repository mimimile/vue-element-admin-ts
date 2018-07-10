<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script lang="ts">
import { debounce } from '@/utils'
import echarts from 'echarts'
import 'echarts/theme/macarons'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { LineChartName } from '../types'

interface ChartData {
  expectedData?: any
  actualData?: any
}

@Component
export default class LineChart extends Vue {
  @Prop(Object)  private chartData!: ChartData
  @Prop({ default: 'chart' })  private className!: string
  @Prop({ default: '100%' })  private width!: string
  @Prop({ default: '350px' })  private height!: string
  @Prop({ default: true })  private autoResize!: boolean

  private chart: any = null
  private resizeHanlder: any = null

  @Watch('chartData', { deep: true })
  private onChartDataChange(val: ChartData) {
    this.setOptions(val)
  }

  private mounted(): void {
    this.initChart()
    if (this.autoResize) {
      this.resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.resizeHanlder)
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.resizeHanlder)
  }

  private beforeDestroy(): void {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.resizeHanlder)

    this.chart.dispose()
    this.chart = null
  }

  private setOptions({ expectedData, actualData }: ChartData = {}) {
    this.chart.setOption({
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        boundaryGap: false,
        axisTick: {
          show: false,
        },
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 20,
        top: 30,
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        padding: [5, 10],
      },
      yAxis: {
        axisTick: {
          show: false,
        },
      },
      legend: {
        data: ['expected', 'actual'],
      },
      series: [{
        name: 'expected', itemStyle: {
          normal: {
            color: '#FF005A',
            lineStyle: {
              color: '#FF005A',
              width: 2,
            },
          },
        },
        smooth: true,
        type: 'line',
        data: expectedData,
        animationDuration: 2800,
        animationEasing: 'cubicInOut',
      },
      {
        name: 'actual',
        smooth: true,
        type: 'line',
        itemStyle: {
          normal: {
            color: '#3888fa',
            lineStyle: {
              color: '#3888fa',
              width: 2,
            },
            areaStyle: {
              color: '#f3f8ff',
            },
          },
        },
        data: actualData,
        animationDuration: 2800,
        animationEasing: 'quadraticOut',
      }],
    })
  }

  private initChart() {
    const el = this.$el as HTMLDivElement | HTMLCanvasElement
    this.chart = echarts.init(el, 'macarons')
    this.setOptions(this.chartData)
  }
}
</script>
